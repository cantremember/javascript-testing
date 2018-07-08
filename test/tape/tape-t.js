const test = require('tape');


test('t methods', (t) => {
  t.plan(8);

  t.pass('PASSES');
  t.ok(true);
  t.notOk(false);
  t.error(null);
  t.equal(1 + 1, 2);
  t.notEqual(1 + 1, 9000);
  t.deepEqual({ a: 1, b: 2 }, { b: 2, a: 1 });
  t.notDeepEqual({ a: 1 }, { b: 2 });

  t.end();
});

test.skip('t.fail', (t) => {
  t.plan(0);

  // can't call it
  //   it doesn't just throw an Error,
  //   it can't be caught / worked around / etc.
  //   so it can't be tested without producing a failure
  t.fail('FAILS');

  t.end();
});

test('t.throws', (t) => {
  t.plan(4);

  const ERROR = new Error('BOOM');
  function throwing() {
    throw ERROR;
  }
  t.throws(throwing, Error);
  t.throws(throwing, ERROR);
  t.throws(throwing, /BOOM/);

  t.doesNotThrow(() => {
    return 23;
  });

  t.end();
});
