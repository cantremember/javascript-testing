const test = require('ava');


// https://github.com/avajs/ava#before--after-hooks
let canary;
test.beforeEach('async canary setup', () => {
  canary = false;
});
test.afterEach('async canary check', (t) => {
  t.plan(1);

  t.true(canary);
});


test.cb('supports callbacks', (t) => {
  t.plan(0);

  setImmediate(() => {
    canary = true;

    t.end();
  });
});

test('supports Promises', (t) => {
  t.plan(0);

  return new Promise((resolve) => {
    setImmediate(() => {
      canary = true;

      resolve();
    });
  });
});

test('supports async / await', async (t) => {
  t.plan(0);

  await new Promise((resolve) => {
    setImmediate(resolve);
  });

  canary = true;
});
