COMPOSE_FILE := ./Docker-Compose.yml

.PHONY: start stop rebuild build delete

build:
	docker-compose -f $(COMPOSE_FILE) build --no-cache

start:
	docker-compose -f $(COMPOSE_FILE) up

stop:
	docker-compose chatapi-nest-js down

rebuild:
	docker-compose -f $(COMPOSE_FILE) rm --stop --force -v
	docker-compose -f $(COMPOSE_FILE) build nest-app
	docker-compose -f $(COMPOSE_FILE) up -d

delete:
	docker-compose down --volumes --remove-orphans
	docker-compose rm --stop --force -v