FROM node:latest

WORKDIR /code

COPY package*.json ./
RUN npm install
COPY tsconfig.build.json ./
COPY tsconfig.json ./
ADD src /code/src

CMD [ "npm", "run", "test" ]