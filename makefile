# Variables
COMPOSE_FILE := ./Docker-Compose.yml

.PHONY: build up down

build:
	docker-compose -f $(COMPOSE_FILE) build

start:
	docker-compose -f $(COMPOSE_FILE) up -d

stop:
	docker-compose -f $(COMPOSE_FILE) down

rebuild:
	docker-compose down
	docker-compose -f $(COMPOSE_FILE) build nest-app

delete:
	docker-compose down --volumes --remove-orphans
	docker-compose rm --stop --force -v