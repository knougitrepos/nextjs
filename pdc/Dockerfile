#FROM node:18-alpine
#
#WORKDIR /usr/src/app
#
#COPY package*.json ./
#
#RUN yarn
#
#COPY . .
#
#RUN yarn install
#RUN yarn build
#
#EXPOSE 3000
#ENV PORT 3000
#
#CMD ["yarn", "start"]
##CMD ["yarn", "dev"]



FROM node:18-alpine

RUN mkdir -p /usr/app
WORKDIR /usr/app

# Install dependencies based on the preferred package manager
COPY ./ ./

RUN yarn install
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
