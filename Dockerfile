FROM node:16

WORKDIR /usr/src/

RUN chown -R node:node /usr/src
USER node

ADD ./package.json /usr/src
ADD ./yarn.lock /usr/src
RUN yarn install

COPY ./ /usr/src
