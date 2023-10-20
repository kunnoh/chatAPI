# NestJS and Postgres docker-compose
NestJS backend container with POSTGRES database container
Docker and docker-compose need to be installed.

docker version
```sh
docker -v
```

docker-compose version
```sh
docker-compose -v
```

**Download & install system**
Dowload from github
```sh
git clone https://github.com/kunnoh/chatAPI.git
```

**Start the system**

##### Start the system in development mode
1. This will run postgres image and start app locally with hot reloading.
2. To run app in development mode, you have to change `.env` `DB_HOST` to be `DB_HOST=localhost`

```sh
make dev
```

##### Start the system in production mode
1. This will run both postgres and app in different docker containers.
2. To run app in production mode, you have to change `.env` `DB_HOST` to be `DB_HOST=db`

```sh
make prod
```

**show app logs**
show app logs in production mode
```sh
make logs-app
```

**Restart the system**
Restart the system
```sh
make restart
```