NODE_BIN = ./node_modules/.bin

MOCHA_OPTIONS = --recursive --ui bdd --timeout 1000


.PHONY: \
	test  tape mocha \
	lint \
	quality

.DEFAULT_GOAL: quality


test:  tape mocha

tape:
	@NODE_ENV=test $(NODE_BIN)/tape 'test/tape/*.js'
	@NODE_ENV=test $(NODE_BIN)/tape -r esm 'test/tape/*.mjs'

mocha:
	@NODE_ENV=test $(NODE_BIN)/mocha $(MOCHA_OPTIONS) --reporter nyan \
		'./test/mocha/*.js'
	@NODE_ENV=test $(NODE_BIN)/mocha $(MOCHA_OPTIONS) --reporter dot \
		 -r esm \
		'./test/mocha/*.mjs'


lint:
	@$(NODE_BIN)/eslint src/ test/
	@$(NODE_BIN)/eslint --ext '.mjs' src/ test/


quality:  test lint
