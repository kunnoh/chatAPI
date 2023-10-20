# Define the default target (runs when you just type 'make' without any arguments)
default: prod

dev:
	make clean
	docker build -t chatapidb:latest ./db
	@if docker ps -a | grep -q chatApiDB; then \
        echo "chatApiDB container is running."; \
		npm -C ./app run start:dev; \
    else \
		docker run -d -p 5432:5432 --name chatApiDB chatapidb; \
		npm -C ./app run start:dev; \
    fi

app-docker:
	# docker stop chatApi
	docker build -t chatapiApp ./app/.
	docker run -d -p 3030:3030 --name chatApi chatapiApp

clean:
	@if docker ps -a | grep -q ; then \
        docker stop chatApiDB; \
		docker rm chatApiDB; \
        echo "Stopped and removed chatApiDB container."; \
    else \
        echo "chatApiDB container is not running."; \
    fi

	@if docker ps -a | grep -q chatApi; then \
        docker stop chatApi; \
		docker rm chatApi; \
        echo "Stopped and removed chatApi container."; \
    else \
        echo "chatApi container is not running."; \
    fi

	@if docker images | grep -q chatapiApp | grep -q latest; then \
		docker rmi -f chatapiApp:latest \
        echo "chatapiApp:latest image is available."; \
    else \
        echo "chatapiApp:latest image is not available."; \
    fi

	@if docker images | grep -q chatapidb | grep -q latest; then \
		docker rmi -f chatapidb:latest \
        echo "chatapidb:latest image is available."; \
    else \
        echo "chatapidb:latest image is not available."; \
    fi

logs-app:
	docker-compose -f docker-compose.yml logs -f chatApi

logs-db:
	docker-compose -f docker-compose.yml logs -f db

prod:
	docker-compose -f docker-compose.yml up -d --build

stop:
	docker-compose down

restart:
	docker-compose down
	docker-compose up -d --build

clean-compose:
	docker-compose down --volumes --remove-orphans
	docker-compose rm --stop --force -v