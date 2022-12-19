FROM node:18-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
RUN npm install
RUN npm install react-scripts@5.0.1 -g

RUN chown -R node:node /app/node_modules

CMD ["npm", "start"]
