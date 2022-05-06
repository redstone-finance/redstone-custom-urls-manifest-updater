# RedStone custom URL manifest monorepo

## Run locally
In order to run locally you need to provide `.env` files to `backend` and `frontend` folders.

Frontend .env file requires `BACKEND_URL` and `JWK_WALLET` values

Backend .env file requires `PORT` and `JWK_WALLET` values

`JWK_WALLET` is stringified value of JWK JSON and needs to have balance on Arweave and Bundlr

In order to start run:

```
  yarn dev
```

## Run in Docker
In order to run in Docker you need to populate values `PORT`, `BACKEND_URL` and `JWK_WALLET` in `Dockerfile` in main folder

`JWK_WALLET` is stringified value of JWK JSON and needs to have balance on Arweave and Bundlr

In order to start in Docker build Docker image and start it: 

Run image build command in main folder:
```
  docker build -t custom-urls .
```

Start docker image:
```
  docker run -p <URL>:<PORT> custom-urls
```
