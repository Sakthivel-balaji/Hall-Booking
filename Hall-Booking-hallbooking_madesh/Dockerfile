FROM node:latest
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm config set registry https://repo1.uhc.com/artifactory/api/npm/npm-remote/
RUN npm install --production

COPY . .

CMD [ "node", "app.js" ]
