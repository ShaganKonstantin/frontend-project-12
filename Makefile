install:
	npm install
	make -C frontend install

frontend-start:
	make -C frontend start

start:
	npx start-server -s ./frontend/dist

build:
	make -C frontend build

develop:
	make start & make frontend-start


