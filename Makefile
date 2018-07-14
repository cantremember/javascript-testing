NODE_BIN = ./node_modules/.bin

MOCHA_OPTIONS = --recursive --ui bdd --timeout 1000


.PHONY: \
	test  tape tape-esm mocha mocha-esm jest ava \
	lint \
	quality ci \
	lock

.DEFAULT_GOAL: quality


test:  tape mocha jest ava


# https://github.com/substack/tape
tape-cjs:
	@NODE_ENV=test $(NODE_BIN)/tape  'test/bootstrap.js' 'test/tape/*.js'
tape-esm:
	@NODE_ENV=test $(NODE_BIN)/tape -r esm  'test/bootstrap.js' 'test/tape/*.mjs'
tape:  tape-cjs tape-esm


# https://mochajs.org/#usage
mocha-cjs:
	@NODE_ENV=test $(NODE_BIN)/mocha $(MOCHA_OPTIONS) --reporter nyan \
		'test/bootstrap.js' './test/mocha/*.js'
mocha-esm:
	@NODE_ENV=test $(NODE_BIN)/mocha $(MOCHA_OPTIONS) --reporter dot \
		 -r esm \
		'test/bootstrap.js' './test/mocha/*.mjs'
mocha:  mocha-cjs mocha-esm


# https://jestjs.io/docs/en/cli
#   @see package.json + { jest }
jest:
	@NODE_ENV=test $(NODE_BIN)/jest --config jest.config.js
# TODO:  ESM variant


# https://jestjs.io/docs/en/cli
#   @see package.json + { ava }
ava:
	@NODE_ENV=test $(NODE_BIN)/ava
# TODO:  ESM variant


lint:
	@$(NODE_BIN)/eslint src/ test/
	@$(NODE_BIN)/eslint --ext '.mjs' src/ test/


quality:  test lint

# can't test any of the ESM files under Travis CI
# ```
# /Users/travis/build/cantremember/javascript-testing/test/tape/tape.mjs:1
# Error [ERR_REQUIRE_ESM]: Must use import to load ES module: file:///Users/travis/build/cantremember/javascript-testing/test/tape/tape.mjs
#     at Module.load (internal/modules/cjs/loader.js:599:32)
#     at tryModuleLoad (internal/modules/cjs/loader.js:538:12)
#     at Function.Module._load (internal/modules/cjs/loader.js:530:3)
#     at Module.require (internal/modules/cjs/loader.js:637:17)
# ```
ci:  tape-cjs mocha-cjs jest ava  lint


lock:
	@npm install --package-lock-only
