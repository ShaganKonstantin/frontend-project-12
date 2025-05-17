start-backend:
	npx start-server -s ./frontend/dist

start-frontend:
	make -C frontend start

develop:
	make start-backend & make start-frontend