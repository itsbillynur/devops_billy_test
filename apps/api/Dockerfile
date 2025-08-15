FROM node:20-alpine

WORKDIR /usr/src/app/apps/api

COPY package*.json ./

RUN npm install

COPY . .
COPY .env ./

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main.js"]
