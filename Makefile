install:
	npm install
	cd frontend && npm install

start:
	npx start-server -s ./frontend/dist

frontend-start:
	cd frontend && npm run dev

build:
	cd frontend && npm run build

develop:
	make start & make frontend-start

test:
	npx playwright test --ui

