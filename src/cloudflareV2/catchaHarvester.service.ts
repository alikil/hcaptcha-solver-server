// Core
import { Injectable, Logger } from '@nestjs/common';
import * as express from 'express';

// Utils
import * as fs from 'fs';
import * as puppeteer from 'puppeteer';

@Injectable()
export class CaptchaHarvesterService {
  private readonly logger = new Logger(CaptchaHarvesterService.name);
  website: any;
  sitekey: any;
  port: number;
  userAgent: any;
  app: any;
  server: any;

  async init(website, sitekey, userAgent, port = 7777) {
    this.website = website;
    this.sitekey = sitekey;
    this.port = port;
    this.userAgent = userAgent;
    this.app = express();
    this.app.use(express.urlencoded({ extended: true }));
    this.server = this.app.listen(port);
  }

  async solveCaptcha() {
    if (!this.server)
      throw new Error('Cannot reuse instance of CaptchaHarvester.');

    let result = null;
    this.app.post('/submit', (req, res) => {
      result = req.body.result;
      res.header('Access-Control-Allow-Origin', '*');
      res.sendStatus(200);
    });

    let htmlBody = fs.readFileSync('./harvester-body.html').toString();
    htmlBody = htmlBody.replace('{{SITEKEY}}', this.sitekey);
    htmlBody = htmlBody.replace('{{PORT}}', this.port.toString());

    const browser = await puppeteer.launch({ headless: false });
    const context = browser.defaultBrowserContext();
    const page = (await context.pages())[0] || (await context.newPage());
    await page.setUserAgent(this.userAgent);

    await page.setRequestInterception(true);
    page.on('request', req => {
      if (!req.isNavigationRequest()) {
        req.continue();
        return;
      }

      req.respond({ status: 200, contentType: 'text/html', body: htmlBody });
    });

    await page.goto(this.website);

    this.logger.log('Check your browser to solve the captcha.');
    while (!result) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    await browser.close();
    this.server.close();
    this.server = null;

    return result;
  }
}
