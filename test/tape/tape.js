const test = require('tape');

const { addTwoNumbers } = require('../../src/common');


test('common', (t) => {
  t.plan(1);

  t.equal(addTwoNumbers(2, 3), 5);

  t.end();
});
