const test = require('ava');

const { mockRequireExport } = require('mock-require-from-bootstrap');
const { mockRequireProperty } = require('mock-require-from-bootstrap').default;


test('BOOTSTRAP_LOADED', (t) => {
  const { BOOTSTRAP_LOADED } = global;

  t.true(BOOTSTRAP_LOADED, true);
});

test('mock-require', (t) => {
  t.plan(2);

  t.is(mockRequireExport, 'EXPORT');
  t.is(mockRequireProperty, 'PROPERTY');
});
