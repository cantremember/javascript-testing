const { expect } = require('chai');

const { mockRequireExport } = require('mock-require-from-bootstrap');
const { mockRequireProperty } = require('mock-require-from-bootstrap').default;


describe('bootstrap', () => {
  it('mockRequireExport', () => {
    const { BOOTSTRAP_LOADED } = global;

    expect(BOOTSTRAP_LOADED).to.equal(true);
  });

  it('mock-require', () => {
    expect(mockRequireExport).to.equal('EXPORT');
    expect(mockRequireProperty).to.equal('PROPERTY');
  });
});
