FROM node
WORKDIR /usr/src/app
COPY ".env" .
COPY . .
RUN npm install
CMD ["node", "index.js"]