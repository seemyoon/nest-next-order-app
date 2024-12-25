FROM node:22-alpine
LABEL authors="semyon"

RUN mkdir /frontend
WORKDIR /frontend

COPY ./frontend/package*.json ./
RUN yarn install

COPY ./frontend ./

RUN yarn run next build
