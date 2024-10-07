from node:18-alpine

WORKDIR /app
COPY public/ /public
COPY src/ /src
COPY package.json /package.json
# COPY package-lock.json /app/package-lock.json
RUN npm install

ADD . /app

WORKDIR /app
# CMD ["npm", "start"]
