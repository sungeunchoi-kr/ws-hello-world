FROM node:14-slim

ENV PATH="node_modules/.bin:${PATH}"

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

CMD [ "npm", "run", "start" ]
