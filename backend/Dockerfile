FROM node:24.7.0-alpine3.21
RUN apk add --no-cache postgresql-client
WORKDIR /app
COPY package*.json ./
ARG NODE_ENV
RUN  if [ ${NODE_ENV} = "production" ]; then npm ci --only=production; else npm install; fi
RUN npm install
COPY . .
ENV PORT=4000
CMD ["npm", "run", "dev"]
EXPOSE ${PORT}
