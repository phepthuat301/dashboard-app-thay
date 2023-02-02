FROM node:14
WORKDIR /app
COPY . .
RUN npm install 
RUN npm run build
CMD [ "node", "server.js" ]
EXPOSE 3000