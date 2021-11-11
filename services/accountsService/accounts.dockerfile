FROM node:14-alpine


Run mkdir -p /usr/lib/node_modules && chown -R node:node /usr/lib/node_modules
Run mkdir -p /usr/local/lib/node_module && chown -R node:node /usr/local/lib/node_module

RUN mkdir -p /home/node/accounts/node_modules && chown -R node:node /home/node/accounts
RUN mkdir -p /home/node/accounts/storage


WORKDIR /home/node/accounts

RUN npm install -g typescript
# COPY storage ./
COPY package*.json ./
COPY tsconfig*.json ./
COPY nodemon*.json ./

USER node

RUN npm install



COPY --chown=node:node . .

RUN npm run build

EXPOSE 6002

ENTRYPOINT [ "npm", "start" ]