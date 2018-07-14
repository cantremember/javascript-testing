const test = require('tape');

const { mockRequireExport } = require('mock-require-from-bootstrap');
const { mockRequireProperty } = require('mock-require-from-bootstrap').default;


test('BOOTSTRAP_LOADED', (t) => {
  const { BOOTSTRAP_LOADED } = global;
  t.plan(1);

  t.equal(BOOTSTRAP_LOADED, true);

  t.end();
});

test('mock-require', (t) => {
  t.plan(2);

  t.equal(mockRequireExport, 'EXPORT');
  t.equal(mockRequireProperty, 'PROPERTY');

  t.end();
});
