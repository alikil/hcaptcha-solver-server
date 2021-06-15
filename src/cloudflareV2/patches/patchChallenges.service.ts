// Core
import { Injectable, Logger } from '@nestjs/common';

// Utils
import * as fs from 'fs';

const PATCHES = {};
PATCHES['23452c7d'] = (ctx: any, entry: { [x: string]: any }) => {
  entry['a'] = JSON.parse(
    fs.readFileSync('./23452c7d_solution.json').toString(),
  );
};

PATCHES['ec60888a'] = (
  ctx: { cNounce: string },
  entry: { [x: string]: any[] },
  state: { reqLog: { find: (filePath: string, value?: boolean) => any } },
) => {
  function makeResEntry(
    log: {
      url: any;
      httpVersion: string;
      totalLength: any;
      contentLength: any;
    },
    initiator: string,
  ) {
    return {
      t: 'r',
      i: initiator,
      n: log.url,
      nh: log.httpVersion === '2' ? 'h2' : 'http/' + log.httpVersion,
      ts: log.totalLength,
      bs: log.contentLength,
    };
  }
  const list = [];
  list.push({ t: 'n', i: 'navigate' });
  let log = state.reqLog.find('/jschal/nojs/transparent.gif');
  list.push(makeResEntry(log, 'css'));
  list.push({ t: 'p', i: 'first-paint' });
  list.push({ t: 'p', i: 'first-contentful-paint' });
  log = state.reqLog.find('/orchestrate/jsch/v1');
  list.push(makeResEntry(log, 'script'));
  log = state.reqLog.find('/jschal/js/nocookie/transparent.gif');
  list.push(makeResEntry(log, 'img'));
  const logsl = state.reqLog.find('/generate/ov1', false);
  for (const logs of logsl) {
    list.push(makeResEntry(logs, 'xmlhttprequest'));
  }
  list.push({ t: 'm', n: 'cp-n-' + parseInt(ctx.cNounce, 10) });
  entry['p'] = list;
};

@Injectable()
export class CloudFlarePatchesService {
  private readonly logger = new Logger(CloudFlarePatchesService.name);
  async patch(ctx: { [x: string]: any }, state = null) {
    for (const key in ctx) {
      if (!Object.hasOwnProperty.call(ctx, key)) continue;
      if (ctx[key].i in PATCHES) {
        PATCHES[ctx[key].i](ctx, ctx[key], state);
      }
    }
  }
}
