import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  public randomTrueFalse() {
    return this.randomFromRange(0, 1) ? 'true' : 'false';
  }
  public randomFromRange(start: number, end: number) {
    return Math.round(Math.random() * (end - start) + start);
  }

  public async delay(ms: number) {
    return new Promise(r => setTimeout(r, ms));
  }

  public uuid(a?: any) {
    const c: any = [1e7];
    return a
      ? // tslint:disable-next-line: no-bitwise
        (a ^ ((Math.random() * 16) >> (a / 4))).toString(16)
      : (c + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, this.uuid);
  }

  public async getRandomUserAgent() {
    // TODO
    return 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36';
  }
}
