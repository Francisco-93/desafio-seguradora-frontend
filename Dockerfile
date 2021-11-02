FROM node:lts-alpine3.11 as angular
WORKDIR /app
COPY package.json /app
RUN npm install --silent
COPY . .
RUN npm run build

FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=angular app/dist/seguradora-gold-frontend /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf