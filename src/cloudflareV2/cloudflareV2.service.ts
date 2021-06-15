// Core
import { Injectable, Logger } from '@nestjs/common';

// Request
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { JSDOM } from 'jsdom';

// Utils
import { RedisService } from 'nestjs-redis';
import * as IORedis from 'ioredis';
import * as lz from 'lz-string';
import * as vm from 'vm';
import { CloudFlarePatchesService } from './patches/patchChallenges.service';
import {
  addFailedAttempt,
  addSuccessfulAttempt,
  listChallengesIn,
} from './debug';
import { CaptchaHarvesterService } from './catchaHarvester.service';

// import * as fs from 'fs';
// const js = fs.readFileSync('public/js/orchestrate.js').toString();

@Injectable()
export class CloudFlareV2Service {
  private readonly logger = new Logger(CloudFlareV2Service.name);
  client: IORedis.Redis;
  private axiosInstance: AxiosInstance;
  url: string;
  sitekey: string;
  proxy: string;
  userAgent: string;
  opts: any;
  cookies: any;
  jsdom: any;
  ctx: any;
  reqLog: any;
  constructor(
    private readonly redisService: RedisService,
    private readonly patches: CloudFlarePatchesService,
    private readonly captchaHarvester: CaptchaHarvesterService,
  ) {
    this.client = this.redisService.getClient();
  }

  async init(host: string, sitekey: string, proxy: string, useragent: string) {
    this.url = host;
    this.sitekey = sitekey;
    this.proxy = proxy;
    this.userAgent = useragent;
    // this.cookies = new ManagedCookies()
    // this.reqLog = new RequestsLog()

    this.axiosInstance = axios.create({
      baseURL: host,
      decompress: false,
      validateStatus() {
        return true;
      },
    });

    const parsed = new URL(this.url);
    this.axiosInstance.interceptors.request.use(
      config => {
        config.headers['User-Agent'] = this.userAgent;
        config.headers['Origin'] = parsed.protocol + '//' + parsed.host;
        config.headers['Referer'] = this.url;
        config.headers['Accept'] =
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8';
        config.headers['Accept-Language'] = 'en-US,en;q=0.9';
        return config;
      },
      error => {
        return Promise.reject(error);
      },
    );

    this.axiosInstance.interceptors.response.use(
      resp => {
        this.logger.log(resp, 'responce use =>');
        return resp;
      },
      function(error) {
        return Promise.reject(error);
      },
    );
  }

  _decodeResponse(data: string, raySuffix: number) {
    let v = 32;
    const w = this.opts['cRay'] + '_' + raySuffix;
    for (let i = 0; i < w.length; i++) {
      v ^= w.charCodeAt(i);
    }
    const t = [];
    let q = 1;
    for (
      let u = 0;
      q;
      q = data.charCodeAt(u++),
        !isNaN(q) && t.push(String.fromCharCode((q - v) % 65535))
    );
    return t.join('');
  }

  _extractFromPage(data: string) {
    const obj = data.match(/window\._cf_chl_opt=({.*?}.*?})/s)[1];
    return new Function('return ' + obj)();
  }

  _extractFromScript(data: string) {
    const values: any = {};
    let match = data.match(/a='(?<a>.*)'\.split\('(.)'\)/);
    if (!match) throw new Error("Couldn't find 'a' array in script.");
    const bigArrayl = match[1].split(match[2]);
    for (const bigArray of bigArrayl) {
      if (
        !('lzAlphabet' in values) &&
        bigArray.length === 65 &&
        bigArray.indexOf('$') !== -1
      )
        values['lzAlphabet'] = bigArray;
    }
    if (!('lzAlphabet' in values))
      throw new Error("Couldn't find LZ alphabet.");
    match = data.match(/\/[.|0-9]*:\d{10}:.{64}\//);
    if (!match) throw new Error("Couldn't find challenge path.");
    values['challengePath'] = match[0];
    if (!('challengePath' in values))
      throw new Error("Couldn't find challenge path.");
    return values;
  }

  async _sendCompressed(
    url: string,
    data: any,
    alphabet: any,
    raySuffix: number,
  ) {
    const pref = '(' + url.substring(url.indexOf('ov1/') + 3) + ') ';
    this.logger.log(pref + 'Sending response...', 'sendCompressed');

    const payload = lz.compress(JSON.stringify(data)).replace('+', '%2b');
    this.logger.verbose(pref + 'Payload: ' + payload, 'sendCompressed');

    const chResp = await this.axiosInstance.request({
      method: 'POST',
      url,
      headers: {
        Cookie: this.cookies.cookieHeader(pref),
        'Content-type': 'application/x-www-form-urlencoded',
        'CF-Challenge': this.opts['cHash'],
      },
      data: 'v_' + this.opts['cRay'] + '=' + payload,
    });
    this.logger.log(
      pref + 'Sent response, status: ' + chResp.status,
      'sendCompressed',
    );
    this.cookies.grabFrom('cf_chl_seq_' + this.opts['cHash'], chResp);
    if (chResp.status !== 200)
      throw new Error('Bad challenge response: ' + chResp.status);
    return this._decodeResponse(chResp.data, raySuffix);
  }

  _execScript(scriptStr: string, window = {}) {
    const chContext = this.jsdom.getInternalVMContext();
    chContext.window['_cf_chl_opt'] = this.opts;
    chContext.window['_cf_chlctx'] = this.ctx;
    Object.assign(chContext.window, window);

    const script = new vm.Script(scriptStr);
    return script.runInNewContext(chContext);
  }

  async _execChallenge(chScript: string, maxWait = 1000) {
    let sendUrl = null;
    const window = {
      sendRequest(url: any) {
        sendUrl = url;
      },
    };
    this.cookies.putProgram('b' + this.ctx.chLog.c);
    this._execScript(chScript, window);
    while (!sendUrl && maxWait > 0) {
      await new Promise(resolve => setTimeout(resolve, 50));
      maxWait -= 50;
    }
    this.cookies.putProgram('a' + this.ctx.chLog.c);
    this.patches.patch(this.ctx, { reqLog: this.reqLog });
    this.logger.verbose(
      '(' +
        this.opts['cHash'] +
        ') Context after script exec: ' +
        JSON.stringify(this.ctx),
      'execChallenge',
    );
    return sendUrl;
  }

  async _initScript(chPlatUrl: string, type: string) {
    const scriptResp = await this.axiosInstance.request({
      method: 'GET',
      url: chPlatUrl + '/orchestrate/' + type + '/v1',
      headers: {
        Cookie: this.cookies.cookieHeader(false),
      },
    });

    if (scriptResp.status !== 200)
      throw new Error(
        'Bad (' + type + ') orchestrate script status: ' + scriptResp.status,
      );

    this.logger.debug(
      'Requested (' + type + ') orchestrate script.' + scriptResp.data,
      'initScript',
    );

    const extracted = this._extractFromScript(scriptResp.data);
    this.logger.debug(
      'Extracted script values: ' + JSON.stringify(extracted),
      'initScript',
    );

    this.ctx = {
      chLog: { c: 0 },
      chReq: this.opts['cType'],
      cNounce: this.opts['cNounce'],
      chC: 0,
      chCAS: 0,
      oV: 1,
      cRq: this.opts['cRq'],
    };
    this.ctx.chLog[this.ctx.chLog.c++] = { start: new Date().getTime() };

    return extracted;
  }

  async _solve(chPlatUrl: string, type: string) {
    const logPrefix = '(' + this.opts['cHash'] + ') ';

    this.logger.log(logPrefix + 'Solving ' + type + ' challenge...', 'log');

    const extracted = await this._initScript(chPlatUrl, type);

    this.cookies.putProgram('e');

    let url =
      chPlatUrl +
      '/generate/ov1' +
      extracted['challengePath'] +
      this.opts['cRay'] +
      '/' +
      this.opts['cHash'];
    while (url) {
      const chScript = await this._sendCompressed(
        url,
        this.ctx,
        extracted['lzAlphabet'],
        0,
      );
      if (chScript.indexOf('window.location.reload();') !== -1) {
        this.logger.error(
          {
            chScript,
            info:
              'Failed solving challenges (' +
              listChallengesIn(this.ctx).join(', ') +
              '). Reloading.',
          },
          'solve',
        );

        addFailedAttempt(this.ctx);

        this.cookies.putProgram('F' + this.ctx.chLog.c);
        return this.request();
      } else if (chScript.indexOf('formEl.submit();') !== -1) {
        this.logger.log(
          {
            chScript,
            info:
              'Solved challenges (' +
              listChallengesIn(this.ctx).join(', ') +
              ').',
          },
          'solve',
        );

        addSuccessfulAttempt(this.ctx);

        this.logger.log(logPrefix + 'Executing final script...', 'solve');

        this._execScript(chScript.replace('formEl.submit();', ''), {
          _cf_chl_done_ran: true,
        });

        const form = this._execScript(
          'new FormData(document.getElementById("challenge-form")).entries();',
        );
        const result = {};
        for (const pair of form) result[pair[0]] = pair[1];
        this.logger.verbose(
          {
            data: logPrefix + 'Challenge form data: ' + JSON.stringify(result),
            result,
          },
          'solve',
        );

        this._execScript(chScript.replace('formEl.submit();', ''), {
          _cf_chl_done_ran: true,
        });

        await new Promise(resolve =>
          setTimeout(
            resolve,
            3000 /* Should be 4000, but we waited 1000 already */,
          ),
        );

        const formUrl = this.jsdom.window.document.getElementById(
          'challenge-form',
        ).action;

        this.logger.log(logPrefix + 'Sending form to ' + formUrl, 'solve');

        const resp = await this.axiosInstance.request({
          method: 'POST',
          url: formUrl,
          headers: {
            'Content-type': 'application/x-www-form-urlencoded',
            Cookie: this.cookies.cookieHeader(false),
          },
          data: (function(obj) {
            const urlEncodedDataPairs = [];
            for (const name in obj)
              urlEncodedDataPairs.push(
                encodeURIComponent(name) + '=' + encodeURIComponent(obj[name]),
              );
            return urlEncodedDataPairs.join('&').replace(/%20/g, '+');
          })(result),
        });

        this.logger.log(
          logPrefix + 'Sent form, status: ' + resp.status,
          'solve',
        );

        if (resp.status === 403) {
          // FIXME: Request log issues (maybe)
          return await this._request(resp);
        }

        if (resp.status === 301) {
          const cfClearance = this.cookies.grabFrom('cf_clearance', resp);
          this.logger.log(logPrefix + 'CF clearance: ' + cfClearance, 'solve');
          return {
            cfClearance,
            cfdUid: this.cookies.get('__cfduid'),
          };
        } else {
          throw new Error('Unknown challenge response code: ' + resp.status);
        }
      } else if (
        (chScript.match(/setTimeout\(chl_done,0\)/g) || []).length === 3
      ) {
        let renderOpts = null;
        const render = function(id: any, opts: any) {
          renderOpts = opts;
        };

        this.cookies.putProgram('b' + this.ctx.chLog.c);

        let sendUrl = null;
        this._execScript(chScript, {
          hcaptcha: { render },
          sendRequest(url: any) {
            sendUrl = url;
          },
          _cf_chl_hloaded: true,
        });

        const siteKey = renderOpts.sitekey;
        this.logger.log(logPrefix + 'Site key is ' + siteKey, 'solve');
        await this.captchaHarvester.init(this.url, siteKey, this.userAgent);

        const captchaResult = await this.captchaHarvester.solveCaptcha();
        if (captchaResult === 'error' || captchaResult === 'expired')
          this.logger.log(
            logPrefix + 'Failed solving captcha: ' + captchaResult,
            'solve',
          );
        else
          this.logger.log(
            logPrefix + 'Solved captcha, token is ' + captchaResult,
            'solve',
          );

        renderOpts.callback(captchaResult);

        while (!sendUrl) {
          await new Promise(resolve => setTimeout(resolve, 50));
        }

        this.cookies.putProgram('a' + this.ctx.chLog.c);
        this.patches.patch(this.ctx, { reqLog: this.reqLog });

        this.logger.verbose(
          'Context after captcha solved: ' + JSON.stringify(this.ctx),
          'solve',
        );

        url = sendUrl;
        continue;
      }

      this.logger.verbose(logPrefix + 'Executing challenge script...', 'solve');

      url = await this._execChallenge(chScript);
      if (!url) {
        this.logger.error(
          {
            chScript,
            info:
              logPrefix +
              "Couldn't complete all challenges (" +
              listChallengesIn(this.ctx).join(', ') +
              '). Reloading.',
          },
          'solve',
        );

        addFailedAttempt(this.ctx);

        this.cookies.putProgram('F' + this.ctx.chLog.c);
        return this.request();
      }
    }
  }

  async _request(resp: AxiosResponse<any>) {
    this.cookies.removeAll((name: string) => {
      return name.startsWith('cf_chl_seq_');
    });

    const cfduid =
      this.cookies.grabFrom('__cfduid', resp) || this.cookies.get('__cfduid');
    this.logger.verbose('Cloudflare UID: ' + cfduid);

    this.opts = this._extractFromPage(resp.data);
    this.logger.verbose(
      'Extracted options: ' + JSON.stringify(this.opts),
      this.opts,
    );

    this.logger.log('Requesting js/nocookie/transparent.gif...');
    await this.axiosInstance.request({
      method: 'GET',
      url:
        '/cdn-cgi/images/trace/jschal/js/nocookie/transparent.gif?ray=' +
        this.opts['cRay'],
      headers: {
        'User-Agent': this.userAgent,
        Cookie: this.cookies.cookieHeader(false),
      },
    });

    this.logger.log('Requesting nojs/transparent.gif...');
    await this.axiosInstance.request({
      method: 'GET',
      url:
        '/cdn-cgi/images/trace/jschal/nojs/transparent.gif?ray=' +
        this.opts['cRay'],
      headers: {
        Cookie: this.cookies.cookieHeader(false),
      },
    });

    this.jsdom = new JSDOM(resp.data, {
      runScripts: 'dangerously',
      pretendToBeVisual: true,
      url: resp.request.res.responseUrl,
    });
    patchJsDom(this.jsdom);

    try {
      if (resp.headers['server'].startsWith('cloudflare')) {
        let match = resp.data.match(
          /cpo.src\s*=\s*"\/cdn-cgi\/challenge-platform(\/h\/.)?\/orchestrate\/jsch\/v1"/im,
        );
        if (match && (resp.status === 429 || resp.status === 503)) {
          if (match[1]) {
            log.info('Using platform: ' + match[1]);
            return await this._solve(
              '/cdn-cgi/challenge-platform' + match[1],
              'jsch',
            );
          } else {
            log.info('Using default platform');
            return await this._solve('/cdn-cgi/challenge-platform', 'jsch');
          }
        } else {
          match = resp.data.match(
            /cpo.src\s*=\s*"\/cdn-cgi\/challenge-platform(\/h\/.)?\/orchestrate\/captcha\/v1"/im,
          );
          if (match && resp.status === 403) {
            if (match[1]) {
              log.info('Using platform: ' + match[1]);
              return await this._solve(
                '/cdn-cgi/challenge-platform' + match[1],
                'captcha',
              );
            } else {
              log.info('Using default platform');
              return await this._solve(
                '/cdn-cgi/challenge-platform',
                'captcha',
              );
            }
          } else {
            console.error(resp.data);
            throw new Error('Unknown challenge.');
          }
        }
      }
    } finally {
      this.jsdom.window.close();
    }

    return resp;
  }

  async request() {
    this.reqLog.clear();

    this.logger.log('Requesting index page...', 'request');
    const resp = await this.axiosInstance.request({
      method: 'GET',
      url: '/',
      headers: {
        Cookie: this.cookies.cookieHeader(),
      },
    });

    return this._request(resp);
  }

  async compress(data: string, alphabet: string) {
    return lz.compress(data);
  }
}
