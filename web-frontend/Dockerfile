FROM node:9.1 AS development
COPY norbitz /app
WORKDIR /app
RUN yarn global add @angular/cli
RUN yarn install
RUN ng build

FROM nginx:1.12
LABEL maintainer="JacobAMason <jacob@jacobmason.net>"
COPY --from=development /app/dist /usr/share/nginx/html
