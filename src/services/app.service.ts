import { Injectable, HttpService, Logger } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { RedisService } from 'nestjs-redis';
import * as IORedis from 'ioredis';
import request = require('request-promise-native');
// tslint:disable-next-line: no-var-requires
const SocksProxyAgent = require('socks-proxy-agent');
@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  client: IORedis.Redis;
  constructor(
    private readonly solveUtils: UtilsService,
    private readonly redisService: RedisService,
  ) {
    this.client = this.redisService.getClient();
  }
  public async solveHcaptcha(
    id: string,
    host: string,
    sitekey: string,
    proxy: string,
    useragent: string,
  ) {
    const timeoutInMs = 1000 * 60 * 4;
    const startingTime = Date.now();
    // const siteKey = this.solveUtils.uuid();
    let errorCount = 0;

    await this.client.hset('token', id, 'start');
    while (true) {
      const result = await this.tryToSolve(host, sitekey, proxy, useragent);
      if (result) {
        if (result.statusCode === 429) {
          this.logger.log(id + 'blocked');
          await this.client.hset('token', id, 'blocked');
          return 'blocked';
        }
        this.logger.log(id + ' success');
        await this.client.hset('token', id, result);
        return 'success';
      } else {
        this.logger.log(id + ' wait');
        await this.client.hset('token', id, 'wait');
        await this.solveUtils.delay(4000);
        errorCount++;
        if (errorCount === 10) {
          await this.client.hset('token', id, 'error');
        }
        this.logger.log(id + ' error ' + 'count: ' + errorCount);
      }
      if (Date.now() - startingTime > timeoutInMs) {
        await this.client.hset('token', id, 'timeout');
        return 'captcha resolution timeout';
      }
    }
  }

  private async getMouseMovements(timestamp: number) {
    let lastMovement = timestamp;
    const motionCount = this.solveUtils.randomFromRange(1000, 10000);
    const mouseMovements = [];
    for (let i = 0; i < motionCount; i++) {
      lastMovement += this.solveUtils.randomFromRange(0, 10);
      mouseMovements.push([
        this.solveUtils.randomFromRange(0, 500),
        this.solveUtils.randomFromRange(0, 500),
        lastMovement,
      ]);
    }
    return mouseMovements;
  }

  private async tryToSolve(
    host: string,
    sitekey: string,
    proxyMy: string,
    useragent: string,
  ) {
    const prRegex = proxyMy.match(/^(.*):(.*)/);
    const agent = new SocksProxyAgent(`socks4://${prRegex[1]}:${prRegex[2]}`);

    const response = await this.firstRequest(host, sitekey, useragent, agent);
    if (!response) {
      return null;
    }
    if (response.generated_pass_UUID) {
      this.logger.log('Success from start');
      return response.generated_pass_UUID;
    }

    const key: string = response.key;
    const tasks = response.tasklist;
    const job: string = response.request_type;
    const timestamp = Date.now() + this.solveUtils.randomFromRange(30, 120);
    const answers = tasks.reduce(
      (accum: any, t: { task_key: any }) => ({
        ...accum,
        [t.task_key]: this.solveUtils.randomTrueFalse(),
      }),
      {},
    );
    const captchaResponse = {
      answers,
      sitekey,
      serverdomain: host,
      job_mode: job,
      motionData: {
        st: timestamp,
        dct: timestamp,
        mm: await this.getMouseMovements(timestamp),
      },
    };

    await this.solveUtils.delay(3000);

    const response2 = await this.secondRequest(
      key,
      captchaResponse,
      useragent,
      agent,
    );
    if (response2.generated_pass_UUID) {
      return response2.generated_pass_UUID;
    }
  }

  private async firstRequest(host, sitekey, useragent, agent, count = 0) {
    count++;
    try {
      this.logger.log('firstRequest count => ' + count);
      const res = await request({
        method: 'post',
        headers: { 'User-Agent': useragent },
        json: true,
        url: 'https://hcaptcha.com/getcaptcha',
        form: { sitekey, host, hl: 'en' },
        agent,
      });
      return res;
    } catch (error) {
      if (error.name === 'RequestError' && count <= 10) {
        await this.solveUtils.delay(2000);
        return await this.firstRequest(host, sitekey, useragent, agent, count);
      } else if (count > 10) {
        return null;
      } else {
        return error;
      }
    }
  }
  private async secondRequest(
    key,
    captchaResponse,
    useragent,
    agent,
    count = 0,
  ) {
    count++;
    this.logger.log(count);
    try {
      const res = await request(`https://hcaptcha.com/checkcaptcha/${key}`, {
        method: 'post',
        headers: { 'User-Agent': useragent },
        json: true,
        form: captchaResponse,
        agent,
      });
      return res;
    } catch (error) {
      if (error.name === 'RequestError' && count <= 10) {
        await this.solveUtils.delay(2000);
        return await this.secondRequest(
          key,
          captchaResponse,
          useragent,
          agent,
          count,
        );
      } else if (count > 10) {
        return null;
      } else {
        return error;
      }
    }
  }
}
