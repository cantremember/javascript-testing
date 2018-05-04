import chai from 'chai';
const { expect } = chai;

import { addTwoNumbers } from '../../src/esm';


describe('esm/addTwoNumbers', () => {
  it('adds to 5', () => {
    expect(addTwoNumbers(2, 3)).to.equal(5);
  });
});
