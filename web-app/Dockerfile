FROM node:16.20.0-alpine3.18 as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./ .

# npm run build

# FROM nginx:latest

# RUN mkdir /app

# COPY --from=build-stage /app/dist/my-app/ /app

# EXPOSE 8888

# COPY nginx.conf /etc/nginx/nginx.conf
# USER nginx