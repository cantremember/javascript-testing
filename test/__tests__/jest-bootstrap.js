/* global test expect */

// // "Cannot find module 'mock-require-from-bootstrap' from 'bootstrap.js'"
// const { mockRequireExport } = require('mock-require-from-bootstrap');
// const { mockRequireProperty } = require('mock-require-from-bootstrap').default;


test('BOOTSTRAP_LOADED', () => {
  const { BOOTSTRAP_LOADED } = global;

  expect(BOOTSTRAP_LOADED).toBe(true);
});

test.skip('mock-require', () => {
  // expect(mockRequireExport).toBe('EXPORT');
  // expect(mockRequireProperty).toBe('PROPERTY');
});
