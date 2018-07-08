/* global test expect */

const { addTwoNumbers } = require('../../src/common');


// opinionated
test('addTwoNumbers adds to 5', () => {
  expect(addTwoNumbers(2, 3)).toBe(5);
});


// supported
it('tests that addTwoNumbers adds to 5', () => {
  expect(addTwoNumbers(2, 3)).toBe(5);
});

describe('common/addTwoNumbers', () => {
  it('adds to 5', () => {
    expect(addTwoNumbers(2, 3)).toBe(5);
  });
});
