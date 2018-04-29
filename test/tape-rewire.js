const tape = require('tape');
const rewire = require('rewire');

const browser = rewire('../src/browser');


tape('browser', (assert) => {
  const addTwoNumbers = browser.__get__('addTwoNumbers');

  assert.equal(addTwoNumbers(2, 3), 5);

  assert.end();
});
