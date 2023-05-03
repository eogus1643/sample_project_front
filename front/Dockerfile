# build stage
#FROM node:18.15.0
FROM node:lts-alpine as build-stage
WORKDIR /app/front
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build
RUN mkdir -p /var/cache/nginx/client_temp
RUN chmod +x /var/cache/nginx/client_temp

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/front/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g","daemon off;"]

# EXPOSE 8080

# #CMD ["npm", "run", "serve"]

# # production stage
# FROM nginx:stable-alpine as production-stage
# COPY --from=build-stage /app/dist /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]