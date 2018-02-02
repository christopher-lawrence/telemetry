FROM node:8.9.4

WORKDIR /app

ADD ./dist/telemetry/ ./telemetry/
ADD ./dist/*.js ./
ADD ./package* ./

ENV NODE_ENV=production

RUN npm install

EXPOSE 80

CMD ["node", "server.js"]
