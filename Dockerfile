FROM node:20-alpine

WORKDIR /app

COPY package.json ./
COPY server.js ./
COPY public/ ./public/

EXPOSE 7070

CMD ["node", "server.js"]
