FROM node:8.0.0-alpine

WORKDIR /www/target
COPY . .

RUN apk add --update --no-cache git

RUN mkdir /www/tmp
COPY package.json /www/tmp/
WORKDIR /www/tmp
RUN npm i -g && npm i -g nodemon babel-cli babel-core && npm i

WORKDIR /www/target
RUN mkdir -p node_modules
RUN cp -R /www/tmp/node_modules/* /www/target/node_modules

ENV NODE_PORT=8081
EXPOSE 8081
CMD npm run db && npm start
