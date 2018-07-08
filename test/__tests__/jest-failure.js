/* global expect */
const assert = require('assert');

// https://jestjs.io/docs/en/asynchronous


let canary;
beforeEach(() => {
  canary = false;
});
afterEach(() => {
  expect(canary).toBe(true);
});


test('with a Promise', () => {
  expect.assertions(2); // +1 for afterEach()

  canary = true; // eg. we really can't test it

  return expect(new Promise((resolve, reject) => {
    reject(new Error('BOOM'));
  })).rejects.toHaveProperty('message', 'BOOM');
});

test('with async / await', async () => {
  function execute() {
    return new Promise((resolve, reject) => {
      setImmediate(() => {
        reject(new Error('BOOM'));
      });
    });
  }

  expect.assertions(2); // +1 for afterEach()

  try {
    await execute();
    assert.fail();
  }
  catch (err) {
    expect(err.message).toBe('BOOM');

    canary = true;
  }
});
