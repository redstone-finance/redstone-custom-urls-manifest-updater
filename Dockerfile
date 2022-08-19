FROM node:16-alpine
WORKDIR /app
COPY package.json package.json
COPY frontend/package.json frontend/package.json
COPY backend/package.json backend/package.json
COPY yarn.lock yarn.lock
COPY frontend/yarn.lock frontend/yarn.lock
COPY backend/yarn.lock backend/yarn.lock

RUN apk update && apk add git
RUN apk add --update python3 make g++
RUN yarn install

COPY . .

ENV MODE=PROD
ENV PORT=9000
ENV BACKEND_URL=http://localhost:9000/api
ENV JWK_WALLET=

EXPOSE 9000
CMD [ "yarn", "start" ]
