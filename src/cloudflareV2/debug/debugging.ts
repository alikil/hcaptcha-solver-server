import * as fs from 'fs';

const ENABLED = true;

const DATA = ENABLED
  ? (() => {
      try {
        return JSON.parse(fs.readFileSync('./debug.json').toString());
      } catch (e) {
        return {
          challenges: { all: [], ok: [], failed: [] },
          deltas: {},
          success: [],
          failed: [],
        };
      }
    })()
  : null;

export const addFailedAttempt = (ctx: any) => {
  if (!ENABLED) return;
  DATA.failed.push(ctx);
  update(ctx, false);
  save();
};

export const addSuccessfulAttempt = (ctx: any) => {
  if (!ENABLED) return;
  DATA.success.push(ctx);
  update(ctx, true);
  save();
};

export const update = (ctx: any, success: boolean) => {
  const listl = listChallengesIn(ctx);
  for (const list of listl) {
    const id = list;

    if (!(id in DATA.deltas)) DATA.deltas[id] = 0;
    DATA.deltas[id] += success ? 1 : -1;

    if (DATA.challenges.all.indexOf(id) === -1) {
      DATA.challenges.all.push(id);
      DATA.challenges.all.sort();
    }

    if (success) {
      if (DATA.challenges.ok.indexOf(id) === -1) {
        DATA.challenges.ok.push(id);
        DATA.challenges.ok.sort();
      }

      const index = DATA.challenges.failed.indexOf(id);
      if (index !== -1) DATA.challenges.failed.splice(index, 1);
    } else {
      if (
        DATA.challenges.ok.indexOf(id) === -1 &&
        DATA.challenges.failed.indexOf(id) === -1
      ) {
        DATA.challenges.failed.push(id);
        DATA.challenges.failed.sort();
      }
    }
  }
};

export const save = () => {
  fs.writeFileSync('./debug.json', JSON.stringify(DATA));
};

export const listChallengesIn = ctx => {
  const list = [];
  for (let j = 0; j < ctx.chLog.c; j++) {
    const id = ctx.chLog[j.toString()].i;
    if (
      typeof id === 'string' &&
      j.toString() in ctx.chLog &&
      list.indexOf(id) === -1
    )
      list.push(id);
  }
  return list;
};
