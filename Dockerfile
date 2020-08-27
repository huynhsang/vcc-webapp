# Check out https://hub.docker.com/_/node to select a new base image
FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Bundle app source code
COPY . .

# If you are building your code for production
# RUN npm run build:production
RUN npm run build:staging
RUN npm i -g serve

EXPOSE 8080

CMD [ "serve", "-s", "build", "-p", "8080" ]
