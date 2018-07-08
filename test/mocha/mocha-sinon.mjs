import sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;

import mockable from '../mockable';
import {
  usesBoundSpyable,
  usesReferencedSpyable,
  usesStubbableReturns,
} from '../usesMockable';


describe('sinon under ESM', () => {
  const sandbox = sinon.createSandbox();
  afterEach(() => {
    sandbox.restore();
  });


  it('calls thru without mocking', () => {
    expect(usesBoundSpyable()).to.equal('SPYABLE');
    expect(usesReferencedSpyable()).to.equal('SPYABLE');
    expect(usesStubbableReturns()).to.equal('RETURNS');
  });

  it('mocks the methods', () => {
    sandbox.stub(mockable, 'spyable').returns('spymock');
    sandbox.stub(mockable.stubbable, 'returns').returns('returnmock');

    expect(usesBoundSpyable()).to.equal('SPYABLE');
    expect(usesReferencedSpyable()).to.equal('SPYMOCK');
    expect(usesStubbableReturns()).to.equal('RETURNMOCK');
  });
});
