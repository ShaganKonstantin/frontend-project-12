frontend-start:
	make -C frontend start

backend-start:
	npx start-server -s ./frontend/dist

develop:
	make backend-start & make frontend-start