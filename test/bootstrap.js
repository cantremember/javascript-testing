const mockRequire = require('mock-require');

mockRequire('mock-require-from-bootstrap', {
  mockRequireExport: 'EXPORT',
  default: {
    mockRequireProperty: 'PROPERTY',
  },
});


global.BOOTSTRAP_LOADED = true;
