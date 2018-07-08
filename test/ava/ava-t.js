const test = require('ava');


test('t methods', (t) => {
  t.plan(11);

  t.pass('PASSES');
  t.truthy(1);
  t.falsy('');
  t.true(true);
  t.false(false);
  t.is(1 + 1, 2);
  t.not(1 + 1, 9000);
  t.deepEqual({ a: 1, b: 2 }, { b: 2, a: 1 });
  t.notDeepEqual({ a: 1 }, { b: 2 });

  const YESSY = /^[yes]+$/i;
  t.regex('YES', YESSY);
  t.notRegex('NO', YESSY);
});

test.failing('t.fail', (t) => {
  t.plan(1);

  t.fail('FAILS');
});

test('t.throws', async (t) => {
  t.plan(4);

  const ERROR = new Error('BOOM');

  function throwing() {
    throw ERROR;
  }
  t.throws(throwing, Error);
  t.throws(throwing, /BOOM/);

  async function rejecting() { // eslint-disable-line require-await
    return Promise.reject(ERROR);
  }
  const err = await t.throws(rejecting, 'BOOM');
  t.is(err.message, 'BOOM');
});

test('t.notThrows', async (t) => {
  t.plan(2);

  function nonThrowing() {
    return 23;
  }
  t.notThrows(nonThrowing);

  async function resolving() { // eslint-disable-line require-await
    return Promise.resolve(23);
  }
  await t.notThrows(resolving);
});
