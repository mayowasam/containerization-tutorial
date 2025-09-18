FROM node:24-alpine
RUN apk add --no-cache postgresql-client
WORKDIR /app

COPY package*.json ./
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "production" ]; then npm ci --only=production; else npm install; fi

COPY . .
ENV PORT=4000
EXPOSE ${PORT}
CMD ["npm", "run", "dev"]
