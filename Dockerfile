FROM node:lts-buster-slim

# Create app directory
WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json
RUN npm install 
RUN npm build

COPY ./dist /usr/src/app/dist

EXPOSE 5000

CMD [ "npm", "run", "start" ]