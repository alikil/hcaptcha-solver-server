import { Injectable } from '@nestjs/common';
import { exception } from 'console';
require('browser-env')();

import { RedisService } from 'nestjs-redis';
import * as IORedis from 'ioredis';

const nameListAray =
  'seJFc{no-cookie-warning{HVxeP{eTuvh{laVfG{xVBzb{bVqUl{ZIGVI{charCodeAt{DUDei{FzqIi{yjtby{lNasB{onreadystatechange{sMAdm{cf-spinner-please-wait{RsspW{WEdzD{qzJgS{compressToBase64{This browser is not supported.{TlaNH{GGiQo{parseInt{kUSNo{NORYg{tkGvE{<p class="cf-alert cf-alert-error">This is taking longer than expected, please reload the page.</p>{LZfBP{ozfFJ{_cf_chl_enter{xLoCu{addEventListener{XkeOM{expires={_cf_chl_hload{call{1|0|4|3|2{IfHNQ{CRMcq{EcJUY{_cf_chl_done_ran{xsBhW{oreha{QtQvE{cRay{chLog{AUWGq{text/javascript{YMeno{SysQR{QPzzc{ydoao{gKnxH{ePqWN{pow{getUTCHours{lJxJE{kDtfk{BUzKZ{OMMTi{llGai{prototype{3|0|2|4|1{FWdpk{jLByG{zkUOG{block{mdoNL{QuwHq{iiUNl{xYKap{;path=/{uGKhy{URL: {VeQaC{readystatechange{attachEvent{Function{toLowerCase{BAtdB{_cf_chl_done{cRq{getTime{zMNDA{toJSON{MPveW{PIzId{decompressFromEncodedURIComponent{QnpFl{aXuMS{dbfVR{PDWae{BCNhu{GxtRV{chC{PPFtD{MkrrT{sYuJn{number{bLIeG{style{==={substring{UOWOP{IIAey{CFaTc{application/x-www-form-urlencoded{toUTCString{IBDRr{wtUpk{https://hcaptcha.com/1/api.js?onload=_cf_chl_hload{CEeGB{xJQJS{MHpqq{=; Max-Age=-99999999;{cvQiO{%2b{JSON{IJiuc{TtKse{cType{alert{dlKBi{JEUBq{RIRJG{dTcSE{rPXeB{indexOf{pFklD{PFwND{0000{AntFm{AKcdp{rjItz{eYfyN{timeout{send{docap{gcyNP{TEtfm{DgZfb{createElement{_cf_chl_ctx{Mqfsx{lastIndex{HGSph{Obdll{console{string{tbONt{ThJye{sHfeO{yXWBL{LIHYG{LDfSWQBlusHg8kX6Oiwyv0a$x2pCRdzYot3nNEIUAqJF94eb5cmj7+GTr-1hVKPZM{ZrHWh{xsZCA{LXrds{log{WAlwU{KpxMr{imCzY{TybjG{getElementById{onerror{valueOf{/0.9586541714387654:1597586739:51bfcb58956440b6a02193404e4a12cf767e3fdd7656440a5ace22650db0841d/{pmEUT{CICtb{replace{XrfOI{AmEWl{VxDys{cf_chl_{compressToEncodedURIComponent{split{RssLq{jMQLE{setRequestHeader{jTeMU{HBVfg{push{ivGGA{ydhGv{sendRequest{KwZKc{cHash{navigator{FIuPl{MSgYl{LxnXK{Line: {isNaN{swGLr{type{test{cf_chl_rc_i{JCCSk{hiMSA{[[[ERROR]]]:{complete{gqTYg{display{tHiwl{getUTCSeconds{document{toString{script error{SHA256{nIkYR{HRCLk{DvKos{pLytF{getUTCFullYear{XaHdY{YMhIA{fyXMm{ - {reload{responseText{innerHTML{PfsVc{apply{getUTCMonth{function{Math{readyState{cHDHA{mLKJt{LHgOV{KYidO{QYdeE{gAKuh{DqfMg{OwMQD{pwuRY{rPNMy{ZfCJF{appendChild{eMIEI{xMjsV{src{fFUHf{_cf_chl_hloaded{Script Error: See Browser Console for Detail{POST{cNounce{length{cf_chl_prog{Column: {4ipzxB3rdEN5w9Qbv2Wt6semCPukVlqRTMDH0AnIFJ1cZXajhf7GSo8ygUKOYL{SJMUG{uGKuf{ActiveXObject{/cdn-cgi/challenge-platform/generate/ov{hzFed{KAWWa{tXgkw{pkLsg{nWPmd{null{tfFSS{DOMContentLoaded{uAaYq{RXxUk{0123456789abcdef{Date{Error object: {Cbjhj{bDYDz{lrbeW{min{getUTCMinutes{JrAnZ{cookie{Microsoft.XMLHTTP{status{nOHfK{String{script{oksWI{MFfcS{EXWeO{parse{ialzm{OhmXR{JMPKC{xsWoE{LBjRj{IdUgg{setTime{OspoT{Content-type{join{HjAKq{Message: {wDHyJ{forEach{_cf_chl_opt{UEIAl{hasOwnProperty{open{bsgWb{NqjFX{LIghe{wxkOo{head{getElementsByTagName{JSON.stringify{CF-Challenge{decompressFromBase64{KDfRY{dCFGs{[object Array]{QwBUa{fromCharCode{ZoYoA{yHKbt{ofQso{iRkrt{chReq{xOfbE{xfOpA{YWNQj{mfqBK{eDMzc{DVsAE{setTimeout{XpbNd{bJBAH{LbKan{object{JJrMf{slice{WLeJd{charAt{PjhGH{WmViA{asZns{DNzRU{ontimeout{stringify{cvId{XMLHttpRequest{xDcuE{qqvIg{fJlCs{boolean';

const cfchlopt = {
  cvId: '1',
  cType: 'interactive',
  cNounce: '71020',
  cRay: '5c3bda4ba9690b80',
  cHash: 'e49fb15c17f1db6',
  cRq: {
    d:
      'lwCM47wyrCDITjRylY4LEReF+F7tGVG74Aw1qYFQFRIiZQrnlTj9iyXr5GjAH6cbpy+5ewkVImAuR+YCPAhU9yyCn1+dv+rzu+bhQAt0QF/dN6fejytDvZQWfpnIj+pVQWe9L5BVjjmIRcYJzuq2JZ8Vte1w3feGPgJmv8zCYKqLqwU0mqyhg/4yexLNrVL7yqsgXr9UVSRk7KkXvw88QKl5KTicv5lclms/jeY1tw25qnwCigOabhNOylKqfNmKSkxzPhDUIiAnjEPByXXq8Lu/rwib62gr9iKcElgXpx84m/0zclm+hOcP2IYNmr0paBEkQQ9UjIEfJpE+VtBmnyIS7WHmYvmh5Ks3Vmg+4AE=',
    t: 'MTU5NzU4ODIyMC43NTIwMDA=',
    m: 'Q2aC1YOccuPZHGtKbz6J10bWT7RHP+RrFN+81u2nN7Q=',
    i1: 'u4fF3O2h7yGLkzMAIaU5Gg==',
    i2: 'epY6NCCEyocP7ms2I38qmw==',
  },
};

@Injectable()
export class Orchestre {
  // i, h, g, f, e, d, c, b, a
  i: () => void;
  h: (n: any) => void;
  g: (n: any, o: any, p: any) => void;
  f: (n: string) => any;
  e: any[];
  d: Document;
  c: (Window & typeof globalThis) | this | any;
  b: (c: any, d?: any) => any;
  a: string[];

  // N, M, L, K, J, I, H, G, F, E, D, C, B, s, o

  // N
  // M
  L: any;

  K: RegExp;
  J: RegExp;
  I: RegExp;
  H: RegExp;
  G: RegExp;
  F: RegExp;

  E: (Q: any, R: any) => any;
  D: (Q: any) => any;
  C: () => any;
  B: (Q: any) => any;

  s: any;
  o: { [x: string]: [() => void] | string };

  T: () => any;
  Q: () => void;
  P: any;

  r: () => void;

  p: { [x: string]: any };
  t: any;

  S: { [x: string]: any };
  T2: (W: { [x: string]: { [x: string]: any } }, X: string | number) => any;

  j: any;
  k: any;
  l: any;
  m: any;
  v: any;
  x: () => void;
  n: any;

  R: any;
  X: any;
  U: any;
  O: { [x: string]: string };
  u: any;
  q: any;
  w: any;
  y: any;
  A: () => void;
  // tslint:disable-next-line: variable-name
  _o: any;
  cname: string;
  mainCoockieSavings: any[];
  firstRequest: any;
  firstRequestData: any;
  client: IORedis.Redis;

  constructor(
    nameListAray: string,
    cfchlopt: {
      cvId: string;
      cType: string;
      cNounce: string;
      cRay: string;
      cHash: string;
      cRq: {
        d: string;
        m: string;
        i1: string;
        i2: string;
      };
    },
    private readonly redisService: RedisService,
  ) {
    this.client = this.redisService.getClient();

    this.mainCoockieSavings = [];
    this.a = nameListAray.split('{');
    this.byteShift(this.a);
    this.initB();
    this.c = self || this;
    this.c._cf_chl_opt = cfchlopt;
    this.d = self.document;
    this.e = [];
    this.initCheckObject(this.c, this.b);
    this.initMain(this.b);
    this.initAdditional(this.b, this.c);

    // this.oneror(this.c, this.b);
    this.sendRequest(this.c, this.b);
    this.request(this.c, this.b);
    this.cf_chl_hload(this.c, this.b);
    this.AddListener(this.c, this.b, this.d);
    this.DOMContentLoadedAttachEventOnreadystatechange(this.c, this.b, this.d);

    this._cf_chl_enter(this.c, this.b, this.d);
    this._cf_chl_done_ran(this.c, this.b);
    this._cf_chl_done(this.c, this.b);

    this.hardGenerate(this.c, this.b, this.d);
    this.SHA256(this.c, this.b, this.d);
    this.ditch(this.c, this.b);

    this.start(this.c, this.b, this.d);
  }

  public getFirstRequest() {
    // console.log(this);

    return { url: this.firstRequest, data: this.firstRequestData };
  }

  private byteShift(a: string[]) {
    ((b, c, d) => {
      (d = (e: number) => {
        for (; --e; b.push(b.shift())) {
          continue;
        }
      }),
        d(++c);
    })(a, 155);
  }

  private initB() {
    this.b = (c, d) => {
      let e: string;
      return (c = c - 0), (e = this.a[c]), e;
    };
  }

  private initCheckObject(
    c: this | (Window & typeof globalThis),
    b: { (c: any, d?: any): any; (arg0: string): string | number },
  ) {
    if ('object' !== typeof c[b('0x138')]) {
      c[b('0x138')] = {};
      return;
    }
  }

  private initMain(b: (arg0: string) => string) {
    ((N, M, L, K, J, I, H, G, F, E, D, C, B, s, o) => {
      if (
        ((o = {}),
        (o.QYdeE = (Q: any, R: any) => Q + R),
        (o[b('0x6b')] = (Q: any, R: any) => Q === R),
        (o[b('0x31')] = b('0xea')),
        (o.sYuJn = 'function'),
        (o[b('0x24')] = (Q: (arg0: any) => any, R: any) => Q(R)),
        (o[b('0x14e')] = b('0x6a')),
        (o[b('0xf4')] = (Q: any, R: any) => Q === R),
        (o[b('0x120')] = (Q: any, R: any) => Q + R),
        (o[b('0x12c')] = (Q: any, R: any) => Q + R),
        (o[b('0x9e')] = (Q: any, R: any) => Q + R),
        (o[b('0xbf')] = b('0xb1')),
        (o[b('0x51')] = (Q: number, R: number) => Q < R),
        (o[b('0x116')] = (Q: (arg0: any, arg1: any) => any, R: any, S: any) =>
          Q(R, S)),
        (o[b('0x13f')] = (Q: any, R: any) => Q + R),
        (o[b('0x73')] = (Q: any, R: any) => Q + R),
        (o[b('0x94')] = (Q: (arg0: any) => any, R: any) => Q(R)),
        (o[b('0x159')] = (Q: any, R: any) => Q + R),
        (o.NqjFX = (Q: any, R: any) => Q + R),
        (o[b('0x12a')] = (Q: any, R: any) => Q + R),
        (o[b('0x3a')] = (Q: (arg0: any) => any, R: any) => Q(R)),
        (o[b('0x147')] = b('0x125')),
        (o[b('0x39')] = (Q: number, R: number) => Q < R),
        (o[b('0x107')] = (Q: any, R: any) => Q !== R),
        (o[b('0x55')] = (Q: any, R: any) => Q + R),
        (o[b('0xa8')] = (Q: any, R: any) => Q !== R),
        (o[b('0x58')] = b('0x146')),
        (o[b('0x86')] = b('0xb0')),
        (o = this.o = o),
        (s = this.s = o),
        (B = this.B = (Q: string | number) => (10 > Q ? '0' + Q : Q)),
        (C = this.C = () => this.valueOf()),
        (D = this.D = (Q: {
          [x: string]: (arg0: any, arg1?: (U: any) => any) => string;
        }) => {
          let R: { [x: string]: any };
          let S: { [x: string]: any };
          if (
            ((R = {}),
            (R[b('0x56')] = (T: any, U: any) => T === U),
            (R.XpbNd = b('0x157')),
            (R[b('0x52')] = (T: any, U: any) => s[b('0x4d')](T, U)),
            (R[b('0x62')] = b('0x145')),
            (R = this.R = R),
            (S = this.S = R),
            (S = R),
            s[b('0x6b')](s[b('0x31')], b('0xf8')))
          ) {
            this.T = () => {
              return G(b('0x0'), Q[b('0xb5')](o));
            };
          } else {
            return (
              (J[b('0x153')] = 0),
              J[b('0x29')](Q)
                ? '"' +
                  Q[b('0xf')](J, (U: string | number) => {
                    let V: any;
                    return (
                      (V = this.P[U]),
                      S[b('0x56')](S[b('0xae')], typeof V)
                        ? V
                        : S[b('0x52')](
                            '\\u',
                            (S[b('0x62')] + U[b('0xca')](0)[b('0x34')](16))[
                              b('0xb3')
                            ](-4),
                          )
                    );
                  }) +
                  '"'
                : s[b('0x4d')](s[b('0x4d')]('"', Q), '"')
            );
          }
        }),
        (E = this.E = (Q, R) => {
          let S: any;
          let T: any;
          let U: any;
          switch (
            ((T = this.T = L),
            (U = this.U = R[Q]),
            U &&
              b('0xb1') === typeof U &&
              s[b('0x124')] === typeof U[b('0x117')] &&
              (U = U[b('0x117')](Q)),
            s[b('0x6b')](b('0x46'), typeof N) && (U = N[b('0xe6')](R, Q, U)),
            typeof U)
          ) {
            case b('0x157'):
              return D(U);
            case b('0x125'):
              return isFinite(U) ? s[b('0x24')](String, U) : b('0x6a');
            case b('0xc1'):
            case s[b('0x14e')]:
              return String(U);
            case 'object':
              if (!U) {
                return b('0x6a');
              }
              let V: any[];
              if (
                ((L += M),
                (V = []),
                s[b('0xf4')](
                  b('0x9f'),
                  Object[b('0x100')][b('0x34')][b('0x44')](U),
                ))
              ) {
                let W: number;
                for (
                  W = U[b('0x5d')], S = 0;
                  S < W;
                  V[S] = E(S, U) || b('0x6a'), S += 1
                ) {
                  continue;
                }
                let X: any;
                return (
                  (X =
                    0 === V[b('0x5d')]
                      ? '[]'
                      : L
                      ? s[b('0x120')](
                          '[\n' +
                            L +
                            V[b('0x8b')](s[b('0x12c')](',\n', L)) +
                            '\n',
                          T,
                        ) + ']'
                      : s[b('0x9e')]('[' + V[b('0x8b')](','), ']')),
                  (L = this.L = T),
                  X
                );
              }

              if (N && s[b('0xbf')] === typeof N) {
                for (let W = N[b('0x5d')], S = 0; s[b('0x51')](S, W); S += 1) {
                  if (b('0x157') === typeof N[S]) {
                    let Y: any;
                    (Y = N[S]),
                      (this.X = s[b('0x116')](E, Y, U)) &&
                        V[b('0x1b')](
                          s[b('0x9e')](D(Y), L ? ': ' : ':') + this.X,
                        );
                  }
                }
              } else {
                // tslint:disable-next-line: forin
                for (const Y in U) {
                  Object[b('0x100')][b('0x92')][b('0xe6')](U, Y) &&
                    (this.X = E(Y, U)) &&
                    V[b('0x1b')](
                      s[b('0x13f')](
                        s[b('0x73')](s[b('0x94')](D, Y), L ? ': ' : ':'),
                        this.X,
                      ),
                    );
                }
              }
              return (
                (this.X =
                  0 === V[b('0x5d')]
                    ? '{}'
                    : L
                    ? s[b('0x73')](
                        s[b('0x73')](
                          s[b('0x73')]('{\n', L),
                          V[b('0x8b')](s.bDYDz(',\n', L)),
                        ) + '\n',
                        T,
                      ) + '}'
                    : s[b('0x73')](s[b('0x73')]('{', V[b('0x8b')](',')), '}')),
                (L = this.L = T),
                this.X
              );
          }
        }),
        (this.F = /^[\],:{}\s]*$/),
        (this.G = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g),
        (this.H = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g),
        (this.I = /(?:^|:|,)(?:\s*\[)+/g),
        (this.J = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g),
        (this.K = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g),
        s[b('0xa8')](s[b('0x124')], typeof Date[b('0x100')][b('0x117')]) &&
          ((Date[b('0x100')][b('0x117')] = function() {
            return s[b('0x94')](isFinite, this[b('0xb')]() || '')
              ? s[b('0x159')](
                  s[b('0x159')](
                    s[b('0x95')](
                      s[b('0x12a')](
                        this[b('0x3b')]() +
                          '-' +
                          B(s[b('0x12a')](this[b('0x45')](), 1)) +
                          '-',
                        s[b('0x94')](B, this.getUTCDate()),
                      ) + 'T',
                      s[b('0x3a')](B, this[b('0xfa')]()),
                    ),
                    ':',
                  ),
                  s[b('0x3a')](B, this[b('0x76')]()),
                ) +
                  ':' +
                  B(this[b('0x32')]()) +
                  'Z'
              : null;
          }),
          (Boolean[b('0x117')] = C),
          (Number[b('0x117')] = C),
          // tslint:disable-next-line: no-string-literal
          (String['toJSON'] = C)),
        b('0x46') !== typeof JSON[b('0xbb')])
      ) {
        if (s[b('0x58')] !== s[b('0x86')]) {
          let O: { [x: string]: string };
          let P: { [x: string]: string };
          (O = {}),
            (O['\b'] = '\\b'),
            (O['\t'] = '\\t'),
            (O['\n'] = '\\n'),
            (O['\f'] = '\\f'),
            (O['\r'] = '\\r'),
            (O['"'] = '\\"'),
            (O['\\'] = '\\\\'),
            (O = this.O = O),
            (P = this.P = O),
            (JSON[b('0xbb')] = (Q: any, R: { [x: string]: any }, S: any) => {
              let T: number;
              if (((M = L = ''), s[b('0x147')] === typeof S)) {
                for (T = 0; s[b('0x39')](T, S); T += 1) {
                  M += ' ';
                }
              } else {
                s[b('0xf4')](b('0x157'), typeof S) && (M = S);
              }
              if (
                (N = R) &&
                b('0x46') !== typeof R &&
                (s[b('0x107')](b('0xb1'), typeof R) ||
                  s[b('0x147')] !== typeof R[b('0x5d')])
              ) {
                throw Error(b('0x9a'));
              }
              let U: { '': any };
              return (U = { '': Q }), E('', U);
            });
        } else {
          this.Q = () => {
            o = this.o = o.substring(1);
          };
        }
      }
      b('0x46') !== typeof JSON[b('0x81')] &&
        (JSON[b('0x81')] = (
          R: string,
          S: {
            [x: string]: (
              arg0: { [x: string]: { [x: string]: any } },
              arg1: string | number,
              arg2: { [x: string]: any },
            ) => any;
          },
        ) => {
          let T2: (
            W: { [x: string]: { [x: string]: any } },
            X: string | number,
          ) => any;
          if (
            ((T2 = this.T2 = (
              W: { [x: string]: { [x: string]: any } },
              X: string | number,
            ) => {
              let Y: string | number;
              let Z: { [x: string]: any };
              if (((Z = W[X]), Z && s[b('0xbf')] === typeof Z)) {
                for (Y in Z) {
                  if (Object[b('0x100')][b('0x92')][b('0xe6')](Z, Y)) {
                    let a0: any;
                    (a0 = s[b('0x116')](T2, Z, Y)),
                      s[b('0x107')](void 0, a0) ? (Z[Y] = a0) : delete Z[Y];
                  }
                }
              }
              return S[b('0xe6')](W, X, Z);
            }),
            (R = String(R)),
            (K[b('0x153')] = 0),
            K[b('0x29')](R) &&
              (R = R[b('0xf')](
                K,
                (W: {
                  [x: string]: (
                    arg0: number,
                  ) => {
                    (): any;
                    new (): any;
                    [x: string]: (arg0: number) => string;
                  };
                }) => {
                  return (
                    '\\u' +
                    (b('0x145') + W[b('0xca')](0)[b('0x34')](16))[b('0xb3')](-4)
                  );
                },
              )),
            F[b('0x29')](
              R[b('0xf')](G, '@')
                [b('0xf')](H, ']')
                [b('0xf')](I, ''),
            ))
          ) {
            let U: any;
            let V: { '': any };
            return (
              (U = s[b('0x3a')](eval, s[b('0x55')]('(' + R, ')'))),
              (V = { '': U }),
              'function' === typeof S ? this.T2(V, '') : U
            );
          }
          throw new SyntaxError('JSON.parse');
        });
    })();
  }

  private initAdditional(
    b: { (c: any, d?: any): any; (arg0: string): string | number },
    c: this | (Window & typeof globalThis),
    params?: {
      n: any;
      o: any;
      p: any;
    },
  ) {
    (this.f = (n: string) => {
      let o: { [x: string]: any };
      let p: { [x: string]: any };
      let q: string;
      let r: { [x: string]: any };
      let s: number;
      for (
        o = {},
          o[b('0xfe')] = (u: number, v: number) => u - v,
          o[b('0x11')] = (u: number, v: number) => u < v,
          o[b('0x130')] = (u: any, v: any) => u !== v,
          o[b('0x139')] = b('0x84'),
          this.p = o,
          p = o,
          q = n + '=',
          r = this.d[b('0x78')][b('0x15')](';'),
          s = 0;
        p[b('0x11')](s, r[b('0x5d')]);
        s++
      ) {
        for (
          this.t = r[s];
          this.t[b('0xb5')](0) == ' ';
          this.t = this.t[b('0x129')](1)
        ) {
          continue;
        }
        if (this.t[b('0x142')](q) == 0) {
          if (this.p[b('0x130')](this.p[b('0x139')], this.p.IJiuc)) {
            this.u = this.u = () => {
              return this.p[b('0xfe')](b[b('0xca')](this.t), 32);
            };
          } else {
            return this.t[b('0x129')](q[b('0x5d')], this.t[b('0x5d')]);
          }
        }
      }
      return '';
    }),
      (this.g = (
        n: string, //  cf_chl_1
        o, // cHash
        p, // 1 (hardcoded)
      ) => {
        let q: any;
        let r: any;
        let s: any;
        let t: any;
        (q = {}),
          (q[b('0x38')] = (u: any, v: any) => u + v),
          (q[b('0xf1')] = (u: number, v: number) => u * v),
          (q[b('0xcb')] = (u: number, v: number) => u * v),
          (q[b('0x97')] = b('0xe4')),
          (r = this.r = this.q = q),
          (s = new Date()),
          s[b('0x88')](
            r[b('0x38')](
              s[b('0x115')](),
              r[b('0xf1')](r[b('0xf1')](r[b('0xcb')](p, 1), 60), 60) * 1e3,
            ),
          ),
          (t = r[b('0x38')](r[b('0x97')], s[b('0x12e')]())),
          (this.d[b('0x78')] =
            r[b('0x38')](r[b('0x38')](n + '=' + o, ';'), t) + b('0x10a')),
          this.mainCoockieSavings.push(this.d[b('0x78')]);
      }),
      (this.h = n => {
        let o: any;
        let p: any;
        (o = {}),
          (o[b('0x141')] = b('0x135')),
          (p = this.p = this.o = o),
          (this.d[b('0x78')] = n + p[b('0x141')]);
      }),
      (this.i = () => {
        let n: any;
        let o: number;
        let p: number;
        let q: number;
        (n = {}),
          (n[b('0x158')] = (r: (arg0: any) => any, s: any) => r(s)),
          (n[b('0x134')] = (r: number, s: number) => r | s),
          (n[b('0x89')] = (r: number, s: number) => r > s),
          (n[b('0x102')] = (r: number, s: number) => r << s),
          (n[b('0x37')] = (r: number, s: number) => r - s),
          (n[b('0x108')] = (r: number, s: number) => r < s),
          (n[b('0x14d')] = (r: any, s: any) => r == s),
          (n[b('0xb9')] = (r: number, s: number) => r - s),
          (n[b('0x14c')] = (r: (arg0: any) => any, s: any) => r(s)),
          (n[b('0x13e')] = (r: any, s: any) => r !== s),
          (n[b('0x1')] = b('0x83')),
          (n[b('0x14f')] = b('0x2a')),
          (o = n),
          (p = c[b('0xd9')](this.f(o[b('0x14f')]))),
          isNaN(p) && (p = 0),
          (q = 1e3 * c[b('0x47')][b('0x75')](2 << p, 128)),
          this.g(b('0x2a'), p + 1, 1),
          c[b('0xad')](() => {
            if (o[b('0x13e')](b('0xdb'), o[b('0x1')])) {
              this.d.location.reload();
            } else {
              const u = this.u();
              const l = this.l();
              // let r = (this.r = () => {
              // if (Object[b('0x100')][b('0x92')][b('0xe6')](u, l)) {
              // if (256 > l[b('0xca')](0)) {
              //       for (
              //         let d = 0;

              //         d < g;
              //         ((a <<= 1),

              //         e == n - 1
              //           ? ((e = 0), k[b('0x1b')](o[b('0x158')](h, a)), (a = 0))
              //           : e++),

              //           d++
              //       );
              //       for (
              //         f = l['charCodeAt'](0), d = 0;
              //         8 > d;
              //         ((a = o[b('0x134')](a << 1, f & 1)),
              //         e == n - 1 ? ((e = 0), k[b('0x1b')](h(a)), (a = 0)) : e++,
              //         (f >>= 1)),
              //           d++
              //       );
              //     } else {
              //       for (
              //         f = 1, d = 0;
              //         d < g;
              //         ((a = o[b('0x134')](a << 1, f)),
              //         e == n - 1
              //           ? ((e = 0), k[b('0x1b')](o[b('0x158')](h, a)), (a = 0))
              //           : e++,
              //         (f = 0)),
              //           d++
              //       );
              //       for (
              //         f = l[b('0xca')](0), d = 0;
              //         o[b('0x89')](16, d);
              //         ((a = o[b('0x134')](o[b('0x102')](a, 1), f & 1)),
              //         e == o[b('0x37')](n, 1)
              //           ? ((e = 0), k[b('0x1b')](h(a)), (a = 0))
              //           : e++,
              //         (f >>= 1)),
              //           d++
              //       );
              //     }
              //     r--,
              //       0 == r && ((r = Math[b('0xf9')](2, g)), g++),
              //       delete u[l];
              //   } else
              //     for (f = n[l], d = 0; o[b('0x108')](d, g); d++)
              //       (a = (a << 1) | (f & 1)),
              //         o[b('0x14d')](e, o[b('0xb9')](n, 1))
              //           ? ((e = 0), k[b('0x1b')](o[b('0x14c')](h, a)), (a = 0))
              //           : e++,
              //         (f >>= 1);
              //   // tslint:disable-next-line: triple-equals
              //   r--, 0 == r && g++;
              // });
            }
          }, q);
      });
  }

  private oneror(
    c: this | (Window & typeof globalThis),
    b: (arg0: string) => string | number,
    params?: {
      n: any;
      o: any;
      p: any;
      q: any;
      r: any;
    },
  ) {
    this.c[b('0xa')] = (n: any, o: any, p: any, q: any, r: any) => {
      let s: { [x: string]: any };
      let t: { [x: string]: any };
      let u: any;
      let v: any;
      if (
        ((s = {}),
        (s.CICtb = (z: any, A: any) => z === A),
        (s[b('0xc4')] = (z: any, A: any) => z !== A),
        (s[b('0x17')] = b('0x2e')),
        (s[b('0x7f')] = b('0x35')),
        (s[b('0xb7')] = b('0x5a')),
        (s[b('0x133')] = b('0x10c')),
        (s[b('0x103')] = (z: any, A: any) => z + A),
        (s[b('0x12b')] = b('0x25')),
        (s.Cbjhj = b('0x3f')),
        (s = this.s = s),
        (t = this.t = s),
        (u = this.u = this.n[b('0x111')]()),
        (v = this.v = t[b('0x7f')]),
        u.indexOf(v) > -1)
      ) {
        if (t[b('0xc4')](b('0x119'), b('0x119'))) {
          this.x = () => {
            if (
              this.t[b('0xe')](this.e[b('0x28')], b('0x10e')) &&
              this.d[b('0x48')] &&
              this.t[b('0xc4')](this.d[b('0x48')], this.t[b('0x17')])
            ) {
              return;
            }
            this.c[b('0xe0')]();
          };
        } else {
          c[b('0x13c')](t[b('0xb7')]);
        }
      } else {
        const t = this.t;
        let w: any;
        (w = [
          b('0x8d') + n,
          t[b('0x133')] + o,
          t[b('0x103')](t[b('0x12b')], p),
          b('0x5f') + q,
          b('0x71') + JSON[b('0xbb')](r),
        ][b('0x8b')](t[b('0x72')])),
          c[b('0x156')][b('0x4')](b('0x2d'), w),
          this.i();
      }
      return ![];
    };
  }

  private sendRequest(c, b) {
    this.c[b('0x1e')] = (n, o) => {
      let p;
      let q;
      if (
        ((p = {}),
        (p.pkLsg = (w, z) => w !== z),
        (p[b('0x123')] = (w, x, y) => w(x, y)),
        (p[b('0xb8')] = w => w()),
        (p[b('0xbe')] = (w, z) => w != z),
        (p[b('0x106')] = (w, x, y, z) => w(x, y, z)),
        (p[b('0x61')] = (w, z) => w || z),
        (p[b('0x10b')] = b('0x3')),
        (p[b('0xa4')] = w => w()),
        (p[b('0x11b')] = (w, z) => w in z),
        (p[b('0x118')] = b('0x14a')),
        (p[b('0xfc')] = b('0x137')),
        (p[b('0x6')] = (w, z) => w + z),
        (p = this.p = p),
        (q = this.q = p),
        (o = this.o = q[b('0x61')](o, 0)),
        o >= 5)
      ) {
        if (q[b('0x10b')] !== b('0x3')) {
          this.w = () => {
            let x;
            (x = x(this.d, this.k)),
              q[b('0x68')](void 0, x)
                ? (this.d[this.k] = x)
                : delete this.d[this.k];
          };
        } else {
          return q[b('0xb8')](this.i), void 0;
        }
      }
      let r: boolean;
      let s: any;
      let t: any;
      if (
        ((r = ![]),
        (s = this.s = () => {
          let x;
          let y;
          if (
            ((x = {}),
            (x[b('0xc5')] = (z, A, B) => q[b('0x123')](z, A, B)),
            (y = this.y = this.x = x),
            (y = this.y = x),
            r)
          ) {
            return;
          }

          (r = !![]),
            c[b('0xad')](() => {
              y[b('0xc5')](this.sendRequest, n, o + 1);
            }, 50);
        }),
        (t = q[b('0xa4')](this.j)),
        !t)
      ) {
        return;
      }

      let u;
      let v;

      // firstRequestData = this.l[b('0x14')](JSON[b('0xbb')](c[b('0x151')]))[
      //   b('0xf')
      // ]('+', q[b('0xfc')]);

      (u = b('0x5b')),
        // t.open(*)
        t[b('0x93')](u, n, !![]),
        q[b('0x11b')](q[b('0x118')], t) &&
          // timeout = 2500
          ((t[b('0x14a')] = 2500),
          // ontimeout reload
          console.log('ontimeout reload'),
          (t[b('0xba')] = () => {
            q[b('0xb8')](s);
          })),
        t[b('0x18')](b('0x8a'), b('0x12d')),
        t[b('0x18')](b('0x9b'), c[b('0x90')].cHash),
        (t[b('0xcf')] = () => {
          // let x;
          // let y;
          // console.log('send request results');
          // for (x = b('0xe7')[b('0x15')]('|'), y = 0; !![]; ) {
          //   switch (x[y++]) {
          //     case '0':
          //       if (t[b('0x7a')] != 200 && t[b('0x7a')] != 304) {
          //         return s(), void 0;
          //       }
          //       continue;
          //     case '1':
          //       if (q[b('0xbe')](t[b('0x48')], 4)) {
          //         return;
          //       }
          //       continue;
          //     case '2':
          //       q[b('0x106')](
          //         this.g,
          //         b('0x5e'),
          //         'a' + c[b('0x151')][b('0xf0')].c,
          //         1,
          //       );
          //       continue;
          //     case '3':
          //       new c[b('0x110')](this.m(t[b('0x41')]))();
          //       continue;
          //     case '4':
          //       this.g(b('0x5e'), 'b' + c[b('0x151')][b('0xf0')].c, 1);
          //       continue;
          //   }
          //   break;
          // }
        }),
        (v = this.v = this.l[b('0x14')](JSON[b('0xbb')](c[b('0x151')]))[
          b('0xf')
        ]('+', q[b('0xfc')]));
      // await this.client.hset('token', this.id, 'start');
      // t[b('0x14b')](q[b('0x6')]('v_' + c[b('0x90')][b('0xef')] + '=', v));
      console.log(this.v);
    };
  }

  private request(c, b) {
    this.j = () => {
      if (c[b('0xbd')]) {
        return new c[b('0xbd')]();
      }
      if (c[b('0x63')]) {
        try {
          return new c[b('0x63')]('Microsoft.XMLHTTP');
        } catch (n) {
          return;
        }
      }
      c[b('0x13c')](b('0xd6')), this.i();
    };
  }

  private cf_chl_hload(c, b) {
    this.c[b('0xe5')] = () => {
      this.c[b('0x59')] = !![];
    };
  }

  private AddListener(
    c: (Window & typeof globalThis) | this,
    b: { (c: any, d?: any): any; (arg0: string): string | number },
    d: Document,
  ) {
    this.e[b('0x1b')](() => {
      let n;
      let o;
      let p;
      (n = {}),
        (n[b('0x6d')] = b('0xdd')),
        (o = n),
        this.c[b('0xad')](() => {
          let q;
          let r;
          if (
            ((q = {}),
            (q[b('0xb6')] = (t, u) => t in u),
            (q[b('0x69')] = b('0x6c')),
            (r = q),
            c[b('0x59')])
          ) {
            return;
          }

          let s;
          if (((s = d[b('0x9')]('cf-spinner-please-wait')), s)) {
            if (b('0x8c') !== b('0xe9')) {
              s[b('0x42')] += o[b('0x6d')];
            } else {
              this.t = () => {
                r[b('0xb6')](b('0xe2'), c);
                // ? d.addEventListener(r[b('0x69')], handler)
                // : d[b('0x10f')](b('0xcf'), handler);
              };
            }
          }
        }, 1e4),
        (p = d[b('0x150')](b('0x7d'))),
        (p[b('0x28')] = b('0xf2')),
        (p[b('0x57')] = b('0x131')),
        d[b('0x99')](b('0x98'))[0][b('0x54')](p);
    });
  }

  private DOMContentLoadedAttachEventOnreadystatechange(c, b, d) {
    this.k = n => {
      b('0xe2') in c ? d[b('0xe2')](b('0x6c'), n) : d[b('0x10f')](b('0xcf'), n);
    };
  }

  private start(c: this | (Window & typeof globalThis), b: any, d: Document) {
    this.k(n => {
      let o;
      let p;
      if (
        ((o = {}),
        (o[b('0x144')] = (q, r) => q === r),
        (o = this.o = o),
        (p = this.p = o),
        p[b('0x144')](n[b('0x28')], b('0x10e')) &&
          d[b('0x48')] &&
          d[b('0x48')] !== b('0x2e'))
      ) {
        return;
      }
      c[b('0xe0')]();
      // this._cf_chl_enter(c, b, d);
    });
  }

  private _cf_chl_enter(c, b, d) {
    this.c[b('0xe0')] = () => {
      let n;
      let o;
      let p;
      let q;
      // let r;
      if (
        ((n = {}),
        (n[b('0x11e')] = (w, z) => w + z),
        (n[b('0xa0')] = b('0x64')),
        (n[b('0x13a')] = b('0x13')),
        (n[b('0x1d')] = b('0xc3')),
        (n[b('0x126')] = (w, x, y, z) => w(x, y, z)),
        (n[b('0xe8')] = b('0x5e')),
        (n[b('0xee')] = (w, x, y, z) => w(x, y, z)),
        (o = this.o = n),
        (n = this.n = n),
        (p = this.p = c[b('0x90')]),
        (q = this.q = o[b('0x13a')] + p[b('0xbc')]),
        this.g(q, p[b('0x20')], 1),
        true)
      ) {
        // let s;
        // getElementById ydhGv style display block
        // return (
        //   (s = d[b('0x9')](o[b('0x1d')])),
        //   s && (s[b('0x127')][b('0x30')] = b('0x105')),
        //   void 0
        // );
      }
      let t: number;
      for (
        this.h(b('0x13') + p[b('0xbc')]),
          o[b('0x126')](this.g, o[b('0xe8')], 's', 1),
          t = 0;
        t < this.e[b('0x5d')];
        this.e[t](), t++
      ) {
        continue;
      }
      let u: { c?: any };
      let v: { [x: string]: any; chCAS?: any; oV?: any };
      o[b('0xee')](this.g, b('0x5e'), 'e', 1),
        (u = {}),
        (u.c = 0),
        (v = {}),
        (v[b('0xf0')] = u),
        (v[b('0xa6')] = p[b('0x13b')]),
        (v[b('0x5c')] = p.cNounce),
        (v[b('0x121')] = 0),
        (v.chCAS = 0),
        (v.oV = 1),
        (v[b('0x114')] = p[b('0x114')]),
        (this.c[b('0x151')] = this.v = v),
        (this.c[b('0x151')][b('0xf0')][c[b('0x151')][b('0xf0')].c++] = {
          start: new Date()[b('0x115')](),
        }),
        (this.firstRequest =
          o[b('0x11e')](o[b('0xa0')] + 1 + b('0xc') + p.cRay, '/') +
          p[b('0x20')]),
        this.c[b('0xad')](() => {
          let w: any;
          (w = this.w =
            o[b('0x11e')](o[b('0xa0')] + 1 + b('0xc') + p.cRay, '/') +
            p[b('0x20')]),
            c[b('0x1e')](w);
        }, 10);
    };
  }

  private _cf_chl_done_ran(c, b) {
    this.c[b('0xeb')] = ![];
  }

  private _cf_chl_done(c, b) {
    this.c[b('0x113')] = () => {
      let n;
      let o;
      (n = {}),
        (n.KYidO = b('0x5e')),
        (o = n),
        this.g(o[b('0x4c')], 'b', 1),
        (c[b('0xeb')] = !![]);
    };
  }

  private hardGenerate(c, b, d) {
    this.l = ((u, t, s, r, p, o, n) => {
      return (
        (n = {}),
        (n[b('0x87')] = (v, z) => v === z),
        (n[b('0x2b')] = b('0x122')),
        (n[b('0x22')] = (v, z) => v < z),
        (n[b('0x74')] = b('0x60')),
        (n[b('0xd')] = b('0x128')),
        (n[b('0xa3')] = (v, z) => v !== z),
        (n[b('0x8')] = b('0xab')),
        (n[b('0xff')] = (v, z) => v == z),
        (n[b('0xe3')] = (v, z) => v * z),
        (n[b('0x85')] = (v, z) => v * z),
        (n[b('0xd8')] = (v, z) => v === z),
        (n[b('0x27')] = (v, z) => v + z),
        (n[b('0xfd')] = (v, z) => v * z),
        (n[b('0x8e')] = b('0x0')),
        (n[b('0xde')] = (v, z) => v == z),
        (n[b('0x66')] = b('0xcd')),
        (n.Obdll = b('0xed')),
        (n[b('0x2f')] = b('0x79')),
        (n[b('0x65')] = (v, z) => v > z),
        (n[b('0x49')] = (v, z) => v < z),
        (n[b('0x11f')] = (v, z) => v | z),
        (n[b('0xf5')] = (v, z) => v - z),
        (n[b('0x104')] = (v, z) => v < z),
        (n[b('0x109')] = (v, z) => v << z),
        (n[b('0xc9')] = (v, z) => v - z),
        (n[b('0x154')] = (v, z) => v(z)),
        (n[b('0x5')] = (v, z) => v == z),
        (n[b('0x11d')] = (v, z) => v(z)),
        (n[b('0xdc')] = (v, z) => v === z),
        (n[b('0x2c')] = (v, z) => v < z),
        (n[b('0x140')] = (v, z) => v > z),
        (n[b('0x148')] = (v, z) => v | z),
        (n[b('0x4b')] = (v, z) => v << z),
        (n.DqfMg = (v, z) => v << z),
        (n[b('0x7b')] = (v, z) => v == z),
        (n[b('0xc6')] = (v, z) => v & z),
        (n.jTeMU = (v, z) => v == z),
        (n[b('0x16')] = (v, z) => v - z),
        (n[b('0x10')] = (v, z) => v < z),
        (n[b('0x6e')] = (v, z) => v == z),
        (n[b('0xc0')] = (v, z) => v(z)),
        (n[b('0x1f')] = (v, z) => v == z),
        (n[b('0x15a')] = (v, z) => v(z)),
        (n[b('0xaf')] = (v, z) => v < z),
        (n[b('0xb4')] = (v, z) => v(z)),
        (n[b('0x143')] = (v, z) => v < z),
        (n[b('0xdf')] = (v, z) => v != z),
        (n[b('0x7e')] = (v, z) => v == z),
        (n[b('0xaa')] = (v, z) => v - z),
        (o = this.o = this.n = n),
        (p = this.p = (v, z) => {
          if (o[b('0x87')](o[b('0x2b')], b('0x13d'))) {
            this.B = () => {
              return void 0;
            };
          } else {
            if (!s[v]) {
              let A: number;
              for (
                s[v] = {}, A = 0;
                o[b('0x22')](A, v[b('0x5d')]);
                s[v][v[b('0xb5')](A)] = A, A++
              ) {
                continue;
              }
            }
            return s[v][z];
          }
        }),
        (r = this.r = String[b('0xa1')]),
        (s = this.s = {}),
        (t = this.t = {
          f: v => {
            if (null == v) {
              return '';
            }
            switch (
              ((v = t.a(v, 6, (z: any) => o[b('0x74')][b('0xb5')](z))),
              v[b('0x5d')] % 4)
            ) {
              default:
              case 0:
                return v;
              case 1:
                return v + o[b('0xd')];
              case 2:
                return v + '==';
              case 3:
                return v + '=';
            }
          },
          h: v => {
            return o[b('0xff')](null, v)
              ? ''
              : '' == v
              ? null
              : t.b(v[b('0x5d')], 32, z => {
                  if (o.yHKbt(o[b('0x8')], b('0xab'))) {
                    this.A = () => {
                      this._o ^= p[b('0xca')](this.i);
                    };
                  } else {
                    return p(o[b('0x74')], v[b('0xb5')](z));
                  }
                });
          },
          l: v => {
            return o[b('0xff')](null, v)
              ? ''
              : t.a(v, 15, z => {
                  return r(z + 32);
                }) + ' ';
          },
          o: v => {
            return null == v
              ? ''
              : '' == v
              ? null
              : t.b(v[b('0x5d')], 16384, z => {
                  return v[b('0xca')](z) - 32;
                });
          },
          m: v => {
            let z;
            let A;
            let B;
            for (
              v = t.j(v),
                z = new Uint8Array(o[b('0xe3')](2, v[b('0x5d')])),
                A = 0,
                B = v[b('0x5d')];
              o[b('0x22')](A, B);
              A++
            ) {
              let C;
              (C = v[b('0xca')](A)),
                (z[2 * A] = C >>> 8),
                (z[o[b('0x85')](2, A) + 1] = C % 256);
            }
            return z;
          },
          s: v => {
            let z;
            let A;
            const ttt: any = '0|4|2|3|1';
            for (z = ttt[b('0x15')]('|'), A = 0; !![]; ) {
              switch (z[A++]) {
                case '0':
                  if (null === v || o[b('0xd8')](void 0, v)) {
                    return t.c(v);
                  }
                  continue;
                case '1':
                  return t.c(B[b('0x8b')](''));
                case '2':
                  // tslint:disable-next-line: prefer-const
                  var B = [];
                  continue;
                case '3':
                  this.C[b('0x8f')](F => {
                    B[b('0x1b')](r(F));
                  });
                  continue;
                case '4':
                  let C;
                  let D;
                  let E;
                  for (
                    C = Array(v[b('0x5d')] / 2), D = 0, E = C[b('0x5d')];
                    o[b('0x22')](D, E);
                    C[D] =
                      256 * v[2 * D] + v[o[b('0x27')](o[b('0xfd')](2, D), 1)],
                      D++
                  ) {
                    continue;
                  }
                  continue;
              }
              break;
            }
          },
          g: v => {
            return null == v
              ? ''
              : t.a(v, 6, z => {
                  return o[b('0x8e')][b('0xb5')](z);
                });
          },
          i: v => {
            let z;
            let A;
            if (
              ((z = {}),
              (z[b('0x15c')] = o[b('0x8e')]),
              (z[b('0xda')] = (B, C) => {
                return o[b('0xde')](B, C);
              }),
              (A = z),
              b('0x1a') !== b('0xf6'))
            ) {
              if (null == v) {
                return '';
              }
              if ('' == v) {
                return null;
              }
              return (
                (v = v[b('0xf')](/ /g, '+')),
                t.b(v[b('0x5d')], 32, B => {
                  return p(A[b('0x15c')], v[b('0xb5')](B));
                })
              );
            } else {
              this.B = () => {
                let C;
                let D;
                let E;
                for (
                  C = this.cname + '=', D = d[b('0x78')][b('0x15')](';'), E = 0;
                  E < D[b('0x5d')];
                  E++
                ) {
                  let F;
                  for (
                    F = D[E];
                    A[b('0xda')](F[b('0xb5')](0), ' ');
                    F = F.substring(1)
                  ) {
                    continue;
                  }
                  if (F[b('0x142')](C) == 0) {
                    return F.substring(C[b('0x5d')], F.length);
                  }
                }
                return '';
              };
            }
          },
          j: v => {
            let z;
            let A;
            return (
              (z = {}),
              (z[b('0x15b')] = o[b('0x66')]),
              (z[b('0xcc')] = o[b('0x155')]),
              (A = z),
              t.a(v, 16, B => {
                if (A[b('0x15b')] !== A[b('0xcc')]) {
                  return r(B);
                } else {
                  this.C = () => {
                    c[b('0x59')] = !![];
                  };
                }
              })
            );
          },
          a: (z, A, B) => {
            let C;
            let D;
            if (((C = {}), (C[b('0xd0')] = o[b('0x2f')]), (D = C), null == z)) {
              return '';
            }
            let E;
            let F;
            let G;
            let H;
            let I;
            let J;
            let K;
            let L;
            let M;
            let N;
            let O;
            for (
              F = {},
                G = {},
                H = '',
                I = 2,
                J = 3,
                K = 2,
                L = [],
                M = 0,
                N = 0,
                O = 0;
              O < z[b('0x5d')];
              O += 1
            ) {
              let P;
              let Q;
              if (
                ((P = z[b('0xb5')](O)),
                Object[b('0x100')][b('0x92')][b('0xe6')](F, P) ||
                  ((F[P] = J++), (G[P] = !0)),
                (Q = o[b('0x27')](H, P)),
                Object[b('0x100')][b('0x92')][b('0xe6')](F, Q))
              ) {
                H = Q;
              } else {
                if (Object[b('0x100')][b('0x92')][b('0xe6')](G, H)) {
                  if (o[b('0x65')](256, H[b('0xca')](0))) {
                    for (
                      E = 0;
                      o[b('0x49')](E, K);
                      ((M <<= 1),
                      N == A - 1
                        ? ((N = 0), L[b('0x1b')](B(M)), (M = 0))
                        : N++),
                        E++
                    ) {
                      continue;
                    }
                    let R;
                    for (
                      R = H[b('0xca')](0), E = 0;
                      8 > E;
                      ((M = o.BCNhu(M << 1, R & 1)),
                      N == o[b('0xf5')](A, 1)
                        ? ((N = 0), L[b('0x1b')](B(M)), (M = 0))
                        : N++,
                      (R >>= 1)),
                        E++
                    ) {
                      continue;
                    }
                  } else {
                    for (
                      this.R = 1, E = 0;
                      o[b('0x104')](E, K);
                      ((M = (M << 1) | this.R),
                      N == o[b('0xf5')](A, 1)
                        ? ((N = 0), L[b('0x1b')](B(M)), (M = 0))
                        : N++,
                      (this.R = 0)),
                        E++
                    ) {
                      continue;
                    }
                    for (
                      this.R = H[b('0xca')](0), E = 0;
                      16 > E;
                      ((M = o[b('0x109')](M, 1) | (this.R & 1)),
                      N == A - 1 ? ((N = 0), L[b('0x1b')](B(M)), (M = 0)) : N++,
                      (this.R >>= 1)),
                        E++
                    ) {
                      continue;
                    }
                  }
                  I--,
                    0 == I && ((I = Math[b('0xf9')](2, K)), K++),
                    delete G[H];
                } else {
                  for (this.R = F[H], E = 0; o[b('0x104')](E, K); E++) {
                    (M = (M << 1) | (this.R & 1)),
                      o[b('0xde')](N, o[b('0xc9')](A, 1))
                        ? ((N = 0), L[b('0x1b')](o[b('0x154')](B, M)), (M = 0))
                        : N++,
                      (this.R >>= 1);
                  }
                }

                I--,
                  o[b('0x5')](0, I) && ((I = Math[b('0xf9')](2, K)), K++),
                  (F[Q] = J++),
                  (H = o[b('0x11d')](String, P));
              }
            }
            if ('' !== H) {
              if (Object[b('0x100')][b('0x92')][b('0xe6')](G, H)) {
                if (o[b('0xdc')](b('0xd3'), b('0xd3'))) {
                  if (o[b('0x65')](256, H[b('0xca')](0))) {
                    for (
                      E = 0;
                      o[b('0x2c')](E, K);
                      ((M <<= 1),
                      o[b('0x5')](N, A - 1)
                        ? ((N = 0), L[b('0x1b')](B(M)), (M = 0))
                        : N++),
                        E++
                    ) {
                      continue;
                    }
                    for (
                      this.R = H.charCodeAt(0), E = 0;
                      o[b('0x140')](8, E);
                      ((M = o[b('0x148')](o[b('0x4b')](M, 1), this.R & 1)),
                      N == A - 1 ? ((N = 0), L[b('0x1b')](B(M)), (M = 0)) : N++,
                      (this.R >>= 1)),
                        E++
                    ) {
                      continue;
                    }
                  } else {
                    if (b('0xa9') !== b('0xa9')) {
                      this.S = () => {
                        return null == z
                          ? ''
                          : t.a(z, 6, T => {
                              return b('0x0').charAt(T);
                            });
                      };
                    } else {
                      for (
                        this.R = 1, E = 0;
                        E < K;
                        ((M = o[b('0x148')](M << 1, this.R)),
                        N == A - 1
                          ? ((N = 0), L[b('0x1b')](B(M)), (M = 0))
                          : N++,
                        (this.R = 0)),
                          E++
                      ) {
                        continue;
                      }
                      for (
                        this.R = H[b('0xca')](0), E = 0;
                        16 > E;
                        ((M = o[b('0x4f')](M, 1) | (this.R & 1)),
                        o[b('0x7b')](N, A - 1)
                          ? ((N = 0), L[b('0x1b')](B(M)), (M = 0))
                          : N++,
                        (this.R >>= 1)),
                          E++
                      ) {
                        continue;
                      }
                    }
                  }
                  I--,
                    0 == I && ((I = Math[b('0xf9')](2, K)), K++),
                    delete G[H];
                } else {
                  this.T = () => {
                    try {
                      return new c[b('0x63')](D[b('0xd0')]);
                    } catch (U) {
                      throw new exception('error');
                    }
                  };
                }
              } else {
                for (this.R = F[H], E = 0; E < K; E++) {
                  (M = (M << 1) | o[b('0xc6')](this.R, 1)),
                    o[b('0x19')](N, o[b('0x16')](A, 1))
                      ? ((N = 0), L[b('0x1b')](B(M)), (M = 0))
                      : N++,
                    (this.R >>= 1);
                }
              }

              I--, 0 == I && K++;
            }
            for (
              this.R = 2, E = 0;
              o[b('0x10')](E, K);
              ((M = o[b('0x4f')](M, 1) | (this.R & 1)),
              o[b('0x6e')](N, A - 1)
                ? ((N = 0), L[b('0x1b')](o[b('0x11d')](B, M)), (M = 0))
                : N++,
              (this.R >>= 1)),
                E++
            ) {
              continue;
            }
            for (;;) {
              if (((M <<= 1), N == A - 1)) {
                L[b('0x1b')](o[b('0xc0')](B, M));
                break;
              } else {
                N++;
              }
            }

            return L[b('0x8b')]('');
          },
          c: v => {
            return o[b('0x1f')](null, v)
              ? ''
              : '' == v
              ? null
              : t.b(v[b('0x5d')], 32768, z => {
                  return v[b('0xca')](z);
                });
          },
          b: (z, A, B) => {
            let C;
            let D;
            let E;
            let F;
            let G;
            let H;
            let I;
            let J;
            let K;
            let L;
            for (
              C = [],
                D = 4,
                E = 4,
                F = 3,
                G = [],
                J = o[b('0xc0')](B, 0),
                K = A,
                L = 1,
                H = 0;
              3 > H;
              C[H] = H, H += 1
            ) {
              continue;
            }
            let M;
            let N;
            for (M = 0, N = Math[b('0xf9')](2, 2), I = 1; I != N; ) {
              let O;
              let P;
              for (O = b('0x101')[b('0x15')]('|'), P = 0; !![]; ) {
                switch (O[P++]) {
                  case '0':
                    K >>= 1;
                    continue;
                  case '1':
                    I <<= 1;
                    continue;
                  case '2':
                    0 == K && ((K = A), (J = o[b('0x15a')](B, L++)));
                    continue;
                  case '3':
                    var Q = J & K;
                    continue;
                  case '4':
                    M |= o.BUzKZ(0 < Q ? 1 : 0, I);
                    continue;
                }
                break;
              }
            }
            switch (M) {
              case 0:
                for (
                  M = 0, N = Math[b('0xf9')](2, 8), I = 1;
                  I != N;
                  Q = J & K,
                    K >>= 1,
                    0 == K && ((K = A), (J = o[b('0x15a')](B, L++))),
                    M |= (o.bJBAH(0, Q) ? 1 : 0) * I,
                    I <<= 1
                ) {
                  continue;
                }
                let R = o[b('0xb4')](r, M);
                break;
              case 1:
                for (
                  M = 0, N = Math[b('0xf9')](2, 16), I = 1;
                  I != N;
                  Q = J & K,
                    K >>= 1,
                    0 == K && ((K = A), (J = B(L++))),
                    M |= (0 < Q ? 1 : 0) * I,
                    I <<= 1
                ) {
                  continue;
                }
                R = o[b('0xb4')](r, M);
                break;
              case 2:
                return '';
            }
            for (H = C[3] = this.R, G[b('0x1b')](this.R); ; ) {
              if (o[b('0x140')](L, z)) {
                return '';
              }
              for (
                M = 0, N = Math[b('0xf9')](2, F), I = 1;
                I != N;
                Q = o[b('0xc6')](J, K),
                  K >>= 1,
                  0 == K && ((K = A), (J = o[b('0xb4')](B, L++))),
                  M |= (o[b('0x143')](0, Q) ? 1 : 0) * I,
                  I <<= 1
              ) {
                continue;
              }
              switch ((this.R = M)) {
                case 0:
                  for (
                    M = 0, N = Math[b('0xf9')](2, 8), I = 1;
                    o[b('0xdf')](I, N);
                    Q = J & K,
                      K >>= 1,
                      o[b('0x7e')](0, K) && ((K = A), (J = B(L++))),
                      M |= (o[b('0x143')](0, Q) ? 1 : 0) * I,
                      I <<= 1
                  ) {
                    continue;
                  }
                  (C[E++] = r(M)), (this.R = E - 1), D--;
                  break;
                case 1:
                  for (
                    M = 0, N = Math[b('0xf9')](2, 16), I = 1;
                    o[b('0xdf')](I, N);
                    Q = J & K,
                      K >>= 1,
                      0 == K && ((K = A), (J = B(L++))),
                      M |= (0 < Q ? 1 : 0) * I,
                      I <<= 1
                  ) {
                    continue;
                  }
                  (C[E++] = r(M)), (this.R = o[b('0xaa')](E, 1)), D--;
                  break;
                case 2:
                  return G[b('0x8b')]('');
              }
              if ((0 == D && ((D = Math[b('0xf9')](2, F)), F++), C[this.R])) {
                this.R = C[this.R];
              } else {
                if (o[b('0xdc')](this.R, E)) {
                  this.R = o[b('0x27')](H, H[b('0xb5')](0));
                } else {
                  return null;
                }
              }
              G[b('0x1b')](this.R),
                (C[E++] = H + this.R[b('0xb5')](0)),
                D--,
                (H = this.R),
                o[b('0x7e')](0, D) && ((D = Math[b('0xf9')](2, F)), F++);
            }
          },
        }),
        (u = {}),
        (u[b('0xd5')] = t.f),
        (u[b('0x14')] = t.g),
        (u[b('0x11a')] = t.i),
        (u[b('0x9c')] = t.h),
        u
      );
    })();
  }

  private SHA256(c, b, d) {
    this.c[b('0x36')] = n => {
      let o;
      let p;
      let q;
      let r;
      return (
        (o = {}),
        (o[b('0x96')] = function(s, t) {
          return s + t;
        }),
        (o[b('0x12')] = function(s, t) {
          return s & t;
        }),
        (o[b('0xd2')] = function(s, t) {
          return s >> t;
        }),
        (o[b('0x50')] = function(s, t) {
          return s >> t;
        }),
        (o[b('0xa2')] = function(s, t) {
          return s << t;
        }),
        (o[b('0x82')] = function(s, t) {
          return s - t;
        }),
        (o[b('0x11c')] = function(s, t) {
          return s !== t;
        }),
        (o[b('0xf3')] = b('0x1c')),
        (o[b('0x132')] = function(s, t) {
          return s | t;
        }),
        (o[b('0x43')] = function(s, t) {
          return s | t;
        }),
        (o[b('0xe1')] = function(s, t) {
          return s & t;
        }),
        (o[b('0x3d')] = function(s, t) {
          return s < t;
        }),
        (o[b('0xce')] = function(s, t) {
          return s * t;
        }),
        (o[b('0x136')] = function(s, t) {
          return s + t;
        }),
        (o[b('0x3c')] = function(s, t) {
          return s - t;
        }),
        (o[b('0x67')] = function(s, t) {
          return s % t;
        }),
        (o[b('0x23')] = function(s, t) {
          return s >> t;
        }),
        (o[b('0xb2')] = function(s, t) {
          return s !== t;
        }),
        (o[b('0x112')] = b('0xd7')),
        (o[b('0xc7')] = function(s, t) {
          return s >> t;
        }),
        (o[b('0xd4')] = function(s, t) {
          return s > t;
        }),
        (o[b('0x9d')] = function(s, t) {
          return s + t;
        }),
        (o[b('0x4e')] = function(s, t) {
          return s === t;
        }),
        (o[b('0xa7')] = function(s, t) {
          return s ^ t;
        }),
        (o[b('0x149')] = function(s, t) {
          return s ^ t;
        }),
        (o.DVsAE = function(s, t) {
          return s ^ t;
        }),
        (o[b('0x3e')] = function(s, t, v) {
          return s(t, v);
        }),
        (o[b('0x77')] = function(s, t) {
          return s >>> t;
        }),
        (o[b('0x4a')] = function(s, t) {
          return s ^ t;
        }),
        (o[b('0xec')] = function(s, t, v) {
          return s(t, v);
        }),
        (o[b('0xfb')] = function(s, t, v) {
          return s(t, v);
        }),
        (o[b('0x53')] = function(s, t) {
          return s & t;
        }),
        (o[b('0x80')] = function(s, t) {
          return s & t;
        }),
        (o[b('0x7')] = function(s, t, v) {
          return s(t, v);
        }),
        (o[b('0xf7')] = function(s, t, v) {
          return s(t, v);
        }),
        (o[b('0x12f')] = function(s, t) {
          return s * t;
        }),
        (o[b('0x152')] = function(s, t) {
          return s << t;
        }),
        (o[b('0xc8')] = function(s, t) {
          return s / t;
        }),
        (p = o),
        (q = function q(s, t) {
          var v;
          return (
            (v = p[b('0x96')](p[b('0x12')](s, 65535), t & 65535)),
            (p[b('0x96')](
              p[b('0xd2')](s, 16) + (t >> 16),
              p[b('0x50')](v, 16),
            ) <<
              16) |
              p[b('0x12')](v, 65535)
          );
        }),
        (r = function r(s, t) {
          return (s >>> t) | p[b('0xa2')](s, p[b('0x82')](32, t));
        }),
        (n = (function(s) {
          if (p[b('0x11c')](p[b('0xf3')], b('0x1c')))
            // tslint:disable-next-line: prefer-const
            var x = (this.x = () => {
              if (!x[t]) {
                var y;
                for (
                  x[t] = {}, y = 0;
                  y < t[b('0x5d')];
                  x[t][t[b('0xb5')](y)] = y, y++
                );
              }
              return x[t][y];
            });
          else {
            var t;
            var v;
            for (
              s = s[b('0xf')](/\r\n/g, '\n'), t = '', v = 0;
              v < s[b('0x5d')];
              v++
            ) {
              var w;
              (w = s[b('0xca')](v)),
                128 > w
                  ? (t += String[b('0xa1')](w))
                  : (127 < w && 2048 > w
                      ? (t += String[b('0xa1')]((w >> 6) | 192))
                      : ((t += String[b('0xa1')](
                          p[b('0x132')](p[b('0x50')](w, 12), 224),
                        )),
                        (t += String[b('0xa1')](
                          p[b('0x43')](p[b('0xe1')](w >> 6, 63), 128),
                        ))),
                    (t += String[b('0xa1')](p[b('0x43')](w & 63, 128))));
            }
            return t;
          }
        })(n)),
        (function(s, v, t) {
          for (
            t = '', v = 0;
            p[b('0x3d')](v, p[b('0xce')](4, s[b('0x5d')]));
            t +=
              b('0x6f')[b('0xb5')](
                (s[p[b('0x50')](v, 2)] >>
                  p[b('0x136')](
                    p[b('0xce')](8, p[b('0x3c')](3, p[b('0x67')](v, 4))),
                    4,
                  )) &
                  15,
              ) +
              b('0x6f')[b('0xb5')](
                p[b('0x23')](s[v >> 2], 8 * (3 - p[b('0x67')](v, 4))) & 15,
              ),
              v++
          );
          return t;
        })(
          (function(s, z, B, A) {
            if (
              ((A = {}),
              (A[b('0xc2')] = b('0xf2')),
              (B = A),
              p[b('0xb2')](b('0xd7'), p[b('0x112')]))
            )
              this.S = () => {
                return s[b('0x129')](this.name.length, s[b('0x5d')]);
              };
            else {
              let C;
              let D;
              let E;
              let F;
              let G;
              for (
                C = [
                  1116352408,
                  1899447441,
                  3049323471,
                  3921009573,
                  961987163,
                  1508970993,
                  2453635748,
                  2870763221,
                  3624381080,
                  310598401,
                  607225278,
                  1426881987,
                  1925078388,
                  2162078206,
                  2614888103,
                  3248222580,
                  3835390401,
                  4022224774,
                  264347078,
                  604807628,
                  770255983,
                  1249150122,
                  1555081692,
                  1996064986,
                  2554220882,
                  2821834349,
                  2952996808,
                  3210313671,
                  3336571891,
                  3584528711,
                  113926993,
                  338241895,
                  666307205,
                  773529912,
                  1294757372,
                  1396182291,
                  1695183700,
                  1986661051,
                  2177026350,
                  2456956037,
                  2730485921,
                  2820302411,
                  3259730800,
                  3345764771,
                  3516065817,
                  3600352804,
                  4094571909,
                  275423344,
                  430227734,
                  506948616,
                  659060556,
                  883997877,
                  958139571,
                  1322822218,
                  1537002063,
                  1747873779,
                  1955562222,
                  2024104815,
                  2227730452,
                  2361852424,
                  2428436474,
                  2756734187,
                  3204031479,
                  3329325298,
                ],
                  D = [
                    1779033703,
                    3144134277,
                    1013904242,
                    2773480762,
                    1359893119,
                    2600822924,
                    528734635,
                    1541459225,
                  ],
                  E = Array(64),
                  s[p[b('0x23')](z, 5)] |= 128 << p[b('0x3c')](24, z % 32),
                  s[p[b('0xa2')](p[b('0xc7')](z + 64, 9), 4) + 15] = z,
                  F = 0;
                F < s[b('0x5d')];
                F += 16
              ) {
                let H;
                let I;
                let J;
                let K;
                let L;
                let M;
                let N;
                let O;
                for (
                  H = D[0],
                    I = D[1],
                    J = D[2],
                    K = D[3],
                    L = D[4],
                    M = D[5],
                    N = D[6],
                    O = D[7],
                    G = 0;
                  64 > G;
                  G++
                ) {
                  var P;
                  if (((P = G), p[b('0xd4')](16, G)))
                    var Q = s[p[b('0x9d')](G, F)];
                  else {
                    if (p[b('0x4e')](b('0x91'), b('0xa5')))
                      this.T = () => {
                        let U;
                        let V;
                        let W;
                        (U = {}),
                          (U[b('0x10d')] = b('0xd1')),
                          (V = U),
                          c[b('0xad')](function() {
                            if (c[b('0x59')]) return;
                            var X;
                            (X = d[b('0x9')](V[b('0x10d')])),
                              X && (X[b('0x42')] += b('0xdd'));
                          }, 1e4),
                          (W = d[b('0x150')](b('0x7d'))),
                          (W[b('0x28')] = B[b('0xc2')]),
                          (W[b('0x57')] = b('0x131')),
                          d[b('0x99')](b('0x98'))[0][b('0x54')](W);
                      };
                    else {
                      var R;
                      (Q = E[G - 2]),
                        (Q = p[b('0xa7')](r(Q, 17), r(Q, 19)) ^ (Q >>> 10)),
                        (Q = q(Q, E[G - 7])),
                        (R = E[p.XaHdY(G, 15)]),
                        (R = p[b('0x149')](
                          p[b('0xac')](p[b('0x3e')](r, R, 7), r(R, 18)),
                          p[b('0x77')](R, 3),
                        )),
                        (Q = q(p[b('0x3e')](q, Q, R), E[G - 16]));
                    }
                  }
                  (E[P] = Q),
                    (P = L),
                    (P = p.DVsAE(
                      p[b('0x4a')](
                        p[b('0xec')](r, P, 6),
                        p[b('0xfb')](r, P, 11),
                      ),
                      p[b('0xfb')](r, P, 25),
                    )),
                    (P = q(
                      q(
                        p[b('0xfb')](
                          q,
                          q(O, P),
                          p[b('0x53')](L, M) ^ p[b('0x80')](~L, N),
                        ),
                        C[G],
                      ),
                      E[G],
                    )),
                    (O = H),
                    (O = r(O, 2) ^ r(O, 13) ^ r(O, 22)),
                    (Q = q(O, (H & I) ^ (H & J) ^ (I & J))),
                    (O = N),
                    (N = M),
                    (M = L),
                    (L = p[b('0xfb')](q, K, P)),
                    (K = J),
                    (J = I),
                    (I = H),
                    (H = q(P, Q));
                }
                (D[0] = q(H, D[0])),
                  (D[1] = p[b('0x7')](q, I, D[1])),
                  (D[2] = q(J, D[2])),
                  (D[3] = q(K, D[3])),
                  (D[4] = p[b('0xf7')](q, L, D[4])),
                  (D[5] = q(M, D[5])),
                  (D[6] = q(N, D[6])),
                  (D[7] = q(O, D[7]));
              }
              return D;
            }
          })(
            (function(s, v, t) {
              for (
                t = [], v = 0;
                v < p.IBDRr(8, s[b('0x5d')]);
                t[v >> 5] |= p[b('0x152')](
                  p[b('0x80')](s[b('0xca')](p[b('0xc8')](v, 8)), 255),
                  24 - (v % 32),
                ),
                  v += 8
              );
              return t;
            })(n),
            8 * n[b('0x5d')],
          ),
        )
      );
    };
  }

  private ditch(c, b) {
    this.m = n => {
      let o;
      let p;
      let q;
      let t;
      let u;
      let v;
      let w;
      for (
        o = {},
          o[b('0x2')] = (z, A) => {
            return z + A;
          },
          p = o,
          q = 1,
          t = [],
          u = 0,
          v = 32,
          w = 1,
          (w = p[b('0x2')](c[b('0x90')][b('0xef')], '_') + 0)[b('0xf')](
            /./g,
            (x, z) => {
              v ^= w[b('0xca')](z);
            },
          );
        q;
        q = n[b('0xca')](u++),
          !c[b('0x26')](q) &&
            t[b('0x1b')](c[b('0x7c')][b('0xa1')]((q - v) % 65535))
      ) {
        continue;
      }
      return t[b('0x8b')]('');
    };
  }
}

// const init = () => {
//   const orchestre = new Orchestre(nameListAray, cfchlopt);
//   console.log('‡‡‡‡‡‡‡‡‡ end ‡‡‡‡‡‡‡‡‡‡‡‡');
//   // console.log(orchestre.b('0x70'));
//   setTimeout(() => {
//     console.log(orchestre.getFirstRequest());
//   }, 10);
// };
// init();
