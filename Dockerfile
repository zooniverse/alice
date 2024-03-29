FROM node:20-alpine

WORKDIR /usr/src/

RUN chown -R node:node /usr/src
USER node

ADD ./package.json /usr/src
ADD ./yarn.lock /usr/src
RUN yarn install --frozen-lockfile

COPY ./ /usr/src
