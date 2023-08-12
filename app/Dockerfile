FROM node:20-alpine AS dev

WORKDIR /src
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build && npm prune --production

FROM node:20-alpine

WORKDIR /src
ENV TZ=Africa/Nairobi
COPY --from=dev /src/dist /src/dist
COPY --from=dev /src/node_modules /src/node_modules

EXPOSE 3000

CMD [ "node", "dist/main" ]