FROM node
WORKDIR /usr/src/finance_api
COPY package.json .
RUN npm install --only=prod
RUN yarn build
COPY ./backend/dist ./backend/dist
EXPOSE 3000