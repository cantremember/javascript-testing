const test = require('tape');
const rewire = require('rewire');

const browser = rewire('../../src/browser');


test('browser', (t) => {
  const addTwoNumbers = browser.__get__('addTwoNumbers');
  t.plan(1);

  t.equal(addTwoNumbers(2, 3), 5);

  t.end();
});
