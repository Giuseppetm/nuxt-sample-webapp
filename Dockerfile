FROM node:18

RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

COPY . /usr/src/nuxt-app/

RUN npm install

CMD ["npm", "run", "dev"]
