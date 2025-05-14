FROM node:18

WORKDIR /usr/src/app

COPY . .

RUN npm install -g @nestjs/cli && npm install && npm run build

EXPOSE 3000

CMD ["node", "dist/main.js"]
