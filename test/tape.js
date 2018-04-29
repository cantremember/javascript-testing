const tape = require('tape');

const { addTwoNumbers } = require('../src/common');


tape('common', (assert) => {
  assert.equal(addTwoNumbers(2, 3), 5);

  assert.end();
});
