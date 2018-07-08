const { expect } = require('chai');


describe('threading', () => {
  let canary;
  beforeEach(() => {
    canary = false;
  });
  afterEach(() => {
    expect(canary).to.equal(true);
  });


  it('supports callbacks', (done) => {
    setImmediate(() => {
      canary = true;
      done();
    });
  });

  it('supports Promises', () => {
    return new Promise((resolve) => {
      setImmediate(() => {
        canary = true;
        resolve();
      });
    });
  });

  it('supports async / await', async () => {
    await new Promise((resolve) => {
      setImmediate(resolve);
    });

    canary = true;
  });
});
