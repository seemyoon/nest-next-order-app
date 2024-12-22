FROM node:22-alpine
LABEL authors="Semyon"

RUN mkdir /app
WORKDIR /app

COPY ./backend/package*.json /app
RUN yarn install

COPY . .

RUN yarn install