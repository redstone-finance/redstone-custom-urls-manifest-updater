FROM node:16
WORKDIR /app
COPY package.json package.json
COPY frontend/package.json frontend/package.json
COPY backend/package.json backend/package.json
COPY yarn.lock yarn.lock
COPY frontend/yarn.lock frontend/yarn.lock
COPY backend/yarn.lock backend/yarn.lock
RUN yarn

COPY . .

ENV MODE=PROD
ENV PORT=9000
ENV BACKEND_URL=http://localhost:9000/api
ENV JWK_WALLET=

ENV LIGHT_MODE=true

EXPOSE 9000
CMD [ "yarn", "start" ]
