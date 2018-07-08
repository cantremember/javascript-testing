const { expect } = require('chai');
const assert = require('assert');


describe('controlled failure', () => {
  let canary;
  beforeEach(() => {
    canary = false;
  });
  afterEach(() => {
    expect(canary).to.equal(true);
  });


  it('can be tested with a Promise', () => {
    return (new Promise((resolve, reject) => {
      reject(new Error('BOOM'));
    }))
    .then(assert.fail, (err) => {
      expect(err.message).to.equal('BOOM');

      canary = true;
    });
  });

  it('can be tested with async / await', async () => {
    function execute() {
      throw new Error('BOOM');
    }

    try {
      await execute();
      assert.fail();
    }
    catch (err) {
      expect(err.message).to.equal('BOOM');

      canary = true;
    }
  });
});
