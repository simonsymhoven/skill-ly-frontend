FROM node AS BUILD_STAGE
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN $(npm bin)/ng build --prod

FROM nginx
EXPOSE 4200
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=BUILD_STAGE /app/dist/fuse/ /usr/share/nginx/html

# docker build -t angular-app-frontend . && docker run -p 4200:80 --link spring-boot-api angular-app-frontend
