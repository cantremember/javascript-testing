const { expect } = require('chai');
const rewire = require('rewire');

const browser = rewire('../../src/browser');


describe('browser/addTwoNumbers', () => {
  const addTwoNumbers = browser.__get__('addTwoNumbers');

  it('adds to 5', () => {
    expect(addTwoNumbers(2, 3)).to.equal(5);
  });
});
