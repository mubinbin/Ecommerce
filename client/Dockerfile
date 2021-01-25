FROM node as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

COPY . ./
RUN npm run build

FROM nginx
RUN rm -rf /usr/share/nginx/html*

COPY --from=build /app/build /usr/share/nginx/html
RUN grep -rl localhost /usr/share/nginx/html | xargs sed -i 's/http:\/\/localhost:8000//g'

COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]