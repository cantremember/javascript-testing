const { expect } = require('chai');

const { addTwoNumbers } = require('../../src/common');


describe('common/addTwoNumbers', () => {
  it('adds to 5', () => {
    expect(addTwoNumbers(2, 3)).to.equal(5);
  });
});
