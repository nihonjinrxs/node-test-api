FROM node:10.15.3-alpine

RUN apk add --no-cache \
  python2=2.7.15-r3 \
  make=4.2.1-r2

RUN mkdir -p /app

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install

COPY ./api.js .
COPY ./logger.js .
COPY ./favicon.ico .

EXPOSE 8080

CMD ["npm", "start"]
