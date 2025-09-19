# FROM node:24 AS build
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# CMD ["npm", "run", "dev"]
# EXPOSE 5173


FROM node:24 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# FROM nginx:alpine
# COPY --from=build /app/dist /usr/share/nginx/html
# COPY /nginx/default.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80

FROM alpine:3.18
WORKDIR /app
COPY --from=build /app/dist /app/dist
