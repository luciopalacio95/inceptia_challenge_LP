FROM node:12.22.6

WORKDIR /usr/src/app
COPY package.json ./

RUN npm upgrade

COPY . .

EXPOSE 3000

CMD ["npm", "start"]