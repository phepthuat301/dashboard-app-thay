FROM node:14
WORKDIR /app
COPY . .
COPY .env.example /app/.env
RUN npm install 
RUN npm run build
CMD [ "node", "server.js" ]