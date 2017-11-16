docker-build:
	docker build . -t smash-ladder

docker-kill:
	docker kill smash-ladder

docker-rm:
	docker rm smash-ladder

docker-run:
	docker run -p 3000:3000 --name smash-ladder-01 smash-ladder -e MYSQL_USER=hackdev -e MYSQL_HOST=10.40.1.40 -e MYSQL_DB=hackathon

docker-restart:
	$(MAKE) docker-build
	$(MAKE) docker-kill
	$(MAKE) docker-rm
	$(MAKE) docker-run
