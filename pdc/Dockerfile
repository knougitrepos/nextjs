FROM node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i -y

COPY . .

RUN npm build

EXPOSE 3000

CMD [ "npm", "run", "dev"]
