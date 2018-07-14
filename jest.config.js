// https://jestjs.io/docs/en/configuration
//   also: package.json + { jest }

// opinionated: CLI does not support '-r <MODULE>'
//   can't use `-r esm`
//   https://github.com/standard-things/esm/issues/97
//   "Your package's entry point should be a CJS module that initializes the loader
//    as our getting started section suggests."

module.exports = {
  // // https://jestjs.io/docs/en/configuration#testmatch-array-string
  // //   - [ "**/__tests__/**/*.js?(x)", "**/?(*.)+(spec|test).js?(x)" ]
  // // opinionated: no easy way to use ESM
  // //   so don't look for '*.mjs' files
  // testMatch: [
  //   '**/__tests__/**/*.?(m)js?(x)',
  //   '**/?(*.)+(spec|test).?(m)js?(x)',
  // ],
  testMatch: [
    '**/__tests__/**/*.js?(x)',
    '**/?(*.)+(spec|test).js?(x)',
  ],

  // // opinionated: go with 'test/__tests__'
  // roots: [
  //   'test',
  //   '<rootDir>/test/jest',
  // ],

  // seems to run AFTER the Tests execute
  setupFiles: [
    './test/bootstrap.js',
  ],
  // setupTestFrameworkScriptFile: './test/bootstrap.js',

  // // not sure how this helps us at all
  // moduleFileExtensions: [ 'js', 'mjs', 'jsx' ],
  // // opinionated: no easy way to use ESM
  moduleFileExtensions: [ 'js', 'jsx' ],


  bail: false,
  globals: { },
  // // opinionated: always showed a notification on success :(
  // notify: true,
  // notifyMode: 'failure',
  roots: [
    'test',
  ],
  runner: 'jest-runner',
  testRunner: 'jasmine2',
  timers: 'real',
  verbose: true,

  collectCoverage: false,
  coverageDirectory: '',
  coverageReporters: [ 'json', 'lcov', 'text' ],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
};
