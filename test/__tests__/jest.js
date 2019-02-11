/* global test expect */
const assert = require('assert');

const { addTwoNumbers } = require('../../src/common');


// opinionated
test('addTwoNumbers adds to 5', () => {
  expect(addTwoNumbers(2, 3)).toBe(5);
});

test.todo('not tested yet');

test.skip('not executed', () => {
  assert.fail();
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
