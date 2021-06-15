import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
import * as IORedis from 'ioredis';
import * as fs from 'fs';
import { JSDOM } from 'jsdom';
import * as jsdom from 'jsdom';
const js = fs.readFileSync('public/js/orchestrate.js').toString();

@Injectable()
export class OrchestreService {
  private readonly logger = new Logger(OrchestreService.name);
  client: IORedis.Redis;
  constructor(private readonly redisService: RedisService) {
    this.client = this.redisService.getClient();
  }
  public async solveOrchestre(id: string, html: string) {
    html = html.replace(
      'cpo.src = "/cdn-cgi/challenge-platform/orchestrate/captcha/v1";',
      'cpo.src = "js/orchestrate.js";',
    );
    html = html.replace(
      'src="/cdn-cgi/scripts/zepto.min.js"',
      'src="js/zepto.min.js"',
    );
    html = html.replace(
      'src="/cdn-cgi/scripts/cf.common.js"',
      'src="js/cf.common.js"',
    );
    html = html.replace(
      'src="/cdn-cgi/scripts/cf.common.js"',
      'src="js/cf.common.js"',
    );
    html = html.replace(
      'id="cf_styles-css" href="/cdn-cgi/styles/cf.errors.css"',
      'id="cf_styles-css" href="css/cf.errors.css"',
    );

    const resourceLoader = new jsdom.ResourceLoader({
      proxy: 'http://95.165.160.46:52165',
      strictSSL: false,
      userAgent:
        'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:54.0) Gecko/20100101 Firefox/54.0',
    });

    const dom = new JSDOM(html, {
      runScripts: 'dangerously',
      includeNodeLocations: true,
      pretendToBeVisual: true,
      resources: resourceLoader,
    });

    const before = fs.writeFileSync(
      'public/before.html',
      dom.window.document.documentElement.outerHTML,
    );
    // const document = dom.window.document.documentElement.outerHTML;
    // const body = document.body;
    // console.log(document);

    // window.eval(orchestre);
  }
}
