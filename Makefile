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


# FIXME:  "Error [ERR_REQUIRE_ESM]"
#   ```
#   /path/to/javascript-testing/test/tape/tape.mjs:1
#   Error [ERR_REQUIRE_ESM]: Must use import to load ES module: file:///path/to/javascript-testing/test/tape/tape.mjs
#       at Module.load (internal/modules/cjs/loader.js:599:32)
#       at tryModuleLoad (internal/modules/cjs/loader.js:538:12)
#       at Function.Module._load (internal/modules/cjs/loader.js:530:3)
#       at Module.require (internal/modules/cjs/loader.js:637:17)
#   ```
#   ... even in Node 8
#   saw this before with an upgrade to esm@3.2.25
#   https://github.com/standard-things/esm/issues/868
#     does not help:  https://github.com/standard-things/esm/issues/868#issuecomment-657965217
#   it's likely that `esm` / `@std/esm` is just not meant for 'blended' projects
#   abandonning, for now (╯°□°）╯︵ ┻━┻


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
# # FIXME:  "Error [ERR_REQUIRE_ESM]"
# tape:  tape-cjs tape-esm
tape:  tape-cjs


# https://mochajs.org/#usage
mocha-cjs:
	@NODE_ENV=test $(NODE_BIN)/mocha $(MOCHA_OPTIONS) --reporter nyan \
		"$(ROOT)/test/bootstrap.js" "$(ROOT)/test/mocha/*.js"
mocha-esm:
	@NODE_ENV=test $(NODE_BIN)/mocha $(MOCHA_OPTIONS) --reporter dot \
		 -r esm \
		"$(ROOT)/test/bootstrap.js" "$(ROOT)/test/mocha/*.mjs"
# # FIXME:  "Error [ERR_REQUIRE_ESM]"
# mocha:  mocha-cjs mocha-esm
mocha:  mocha-cjs


# https://jestjs.io/docs/en/cli
#   @see package.json + { jest }
jest:
	@NODE_ENV=test $(NODE_BIN)/jest --config jest.config.js
# TODO:  jest-esm


# https://jestjs.io/docs/en/cli
#   @see package.json + { ava }
ava:
	@NODE_ENV=test $(NODE_BIN)/ava
# TODO:  ava-esm


lint:
	@$(NODE_BIN)/eslint src/ test/
	@$(NODE_BIN)/eslint --ext '.mjs' src/ test/


quality:  test lint

ci:  test lint


lock:
	@npm install --package-lock-only
