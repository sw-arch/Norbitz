FROM node:9.1 AS development
RUN yarn global add @angular/cli
WORKDIR /app
COPY norbitz/package.json .
RUN yarn install
COPY norbitz /app
RUN ng build

FROM nginx:1.12
LABEL maintainer="JacobAMason <jacob@jacobmason.net>"
COPY --from=development /app/dist /usr/share/nginx/html

