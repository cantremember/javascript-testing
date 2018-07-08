/* global test expect */

const { addTwoNumbers } = require('./common');


test('spec tested by `jest`', () => {
  expect(addTwoNumbers(2, 3)).toBe(5);
});
