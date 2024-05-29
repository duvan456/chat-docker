FROM node:latest

RUN apt-get update && apt-get install -y build-essential
RUN apt-get install -y sqlite3 libsqlite3-dev

COPY . /app


WORKDIR /app


RUN npm install 
RUN npm rebuild sqlite3 --build-from-source

EXPOSE 4000

CMD ["node", "index.js"]
