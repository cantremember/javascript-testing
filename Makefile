ROOT = $(shell pwd)
NODE_BIN = $(ROOT)/node_modules/.bin

MOCHA_OPTIONS = --recursive --ui bdd --timeout 1000


.PHONY: \
	init post-install \
	test  tape tape-esm mocha mocha-esm jest ava \
	lint \
	quality ci \
	lock

.DEFAULT_GOAL: quality


init:
	@mkdir -p $(ROOT)/build/mongodb

post-install:  init
	@node -r esm  $(ROOT)/bin/post-install.mjs


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
		"$(ROOT)/test/bootstrap.js" "$(ROOT)/test/mocha/*.js"
mocha-esm:
	@NODE_ENV=test $(NODE_BIN)/mocha $(MOCHA_OPTIONS) --reporter dot \
		 -r esm \
		"$(ROOT)/test/bootstrap.js" "$(ROOT)/test/mocha/*.mjs"
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

# # no *-esm tests
# ci:  tape-cjs mocha-cjs jest ava  lint
# # all the good stuff
# ci:  test lint
ci:  quality


lock:
	@npm install --package-lock-only
