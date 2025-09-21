# FROM node:24 AS build
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# CMD ["npm", "run", "dev"]
# EXPOSE 5173



# Stage 1: Build frontend
FROM node:24 AS build
WORKDIR /app
COPY frontend/paper-app/package*.json ./
RUN npm install
COPY frontend/paper-app/. .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

