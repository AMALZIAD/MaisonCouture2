FROM node:16.20.0-alpine3.18 as build-stage

WORKDIR /app

COPY package*.json ./


RUN npm install

COPY ./ .

RUN npm run build

FROM nginx:latest as prod-stage

RUN mkdir /app

COPY --from=build-stage --chown=101:101 /app/dist/web-app/ /usr/share/nginx/html/

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 4200

# CMD ["nginx", "-g", "daemon off;"]