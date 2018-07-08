const test = require('ava');

const { addTwoNumbers } = require('../../src/common');


test('common', (t) => {
  t.plan(1);

  t.is(addTwoNumbers(2, 3), 5);
});
