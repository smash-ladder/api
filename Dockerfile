FROM node:boron

RUN mkdir /opt/www
WORKDIR /opt/www

COPY package.json package-lock.json /opt/www/ 
RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build

CMD npm run serve
