FROM node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i -y

COPY . .

RUN npm install && npm run build

EXPOSE 3000

CMD npm run start

