install:
	npm install

pubish:
	npm publish

lint:
	npm run eslint

test:
	npm run test

build:
	rm -rf dist
	NODE_ENV=production npm run webpack

develop:
	npm run dev
