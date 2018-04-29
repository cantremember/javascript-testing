NODE_BIN = ./node_modules/.bin


.PHONY: \
	test lint quality

.DEFAULT_GOAL: quality


test:
	@$(NODE_BIN)/tape 'test/*.js' 'test/**/*.js'
	@$(NODE_BIN)/tape -r esm 'test/*.mjs' 'test/**/*.mjs'

lint:
	@$(NODE_BIN)/eslint src/ test/
	@$(NODE_BIN)/eslint --ext '.mjs' src/ test/

quality: test lint
