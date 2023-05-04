# build stage
FROM node:18.15.0
# FROM node:lts-alpine as build-stage
WORKDIR /app/front
COPY package*.json .
RUN npm install
RUN npm install --save axios
RUN npm install --save xlsx
RUN npm i vue-chartjs chart.js
RUN npm install chartjs-plugin-zoom
RUN npm install --save moment
RUN npm install -S vue-sweetalert2
COPY . .
RUN npm run build


# RUN mkdir -p /var/cache/nginx/client_temp
# RUN chmod +x /var/cache/nginx/client_temp
# ARG DISABLE_CACHE

# FROM nginx:stable-alpine as production-stage
# COPY --from=build-stage /app/front/dist /usr/share/nginx/html
EXPOSE 8080

# CMD ["nginx", "-g","daemon off;"]

# EXPOSE 8080

CMD ["npm", "run", "serve"]

# # production stage
# RUN chmod +x /var/cache/nginx/client_temp
# FROM nginx:stable-alpine as production-stage
# COPY --from=build-stage /app/front/dist /usr/share/nginx/html
# EXPOSE 8080
# CMD ["nginx", "-g", "daemon off;"]
