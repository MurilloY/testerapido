FROM node:14.21.2-alpine3.17 as build

ARG ENV_FILE


WORKDIR /app

COPY . .

RUN echo n | npm install --global @angular/cli@14.2.10
RUN echo n | npm install
#--configuration=staging
RUN echo n | ng build --configuration=${ENV_FILE} --aot --vendor-chunk --delete-output-path --build-optimizer

FROM nginx:1.21.6
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build  /app/dist/fisiomart  /usr/share/nginx/html
RUN chmod -R a+r /usr/share/nginx/html
RUN chmod -R 777 /usr/share/nginx/html/assets
