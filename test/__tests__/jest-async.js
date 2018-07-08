/* global expect */

// https://jestjs.io/docs/en/asynchronous


let canary;
beforeEach(() => {
  canary = false;
});
afterEach(() => {
  expect(canary).toBe(true);
});


test('supports callbacks', (done) => {
  expect.assertions(1);

  setImmediate(() => {
    canary = true;
    done();
  });
});

test('supports Promises', () => {
  const EXPECTED = {};
  function promised() {
    return new Promise((resolve) => {
      setImmediate(() => {
        canary = true;
        resolve(EXPECTED);
      });
    });
  }

  expect.assertions(2);

  return expect(promised()).resolves.toBe(EXPECTED);
});

test('supports async / await', async () => {
  expect.assertions(1);

  await new Promise((resolve) => {
    setImmediate(resolve);
  });

  canary = true;
});
