import { Controller, Get, Query, Post, Body, Logger } from '@nestjs/common';

import { AppService, OrchestreService } from '../services';

import { SolcerDTO, OrchestreDto } from '../dto';

import { RedisService } from 'nestjs-redis';
import * as IORedis from 'ioredis';
import { v4 as uuid } from 'uuid';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppService.name);
  client: IORedis.Redis;
  constructor(
    private readonly appService: AppService,
    private readonly orchestreService: OrchestreService,
    private readonly redisService: RedisService,
  ) {
    this.client = this.redisService.getClient();
  }

  @Post('solveHcaptcha')
  async solveHcaptcha(@Body() data: SolcerDTO) {
    this.logger.log(data);
    this.logger.log(data.useragent);
    const id = uuid();
    this.appService.solveHcaptcha(
      id,
      data.host,
      data.sitekey,
      data.proxy,
      data.useragent,
    );
    return id;
  }

  @Get('takeAnswer')
  async takeAnswer(@Query('id') id: string) {
    const result = await this.client.hget('token', id);
    if (!result) {
      return 'not found!';
    } else {
      return result;
    }
  }

  @Post('solveOrchestre')
  async solveOrchestre(@Body() data: OrchestreDto) {
    const id = uuid();
    // this.logger.log(data);
    this.orchestreService.solveOrchestre(id, data.html);
    return id;
  }

  @Get('takeOrchestre')
  async takeOrchestre(@Query('id') id: string) {
    const result = await this.client.hget('takeOrchestre', id);
    if (!result) {
      return 'not found!';
    } else {
      return result;
    }
  }
}
