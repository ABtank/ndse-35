FROM node:20.10-alpine
WORKDIR /app

ARG NODE_ENV=production

COPY ./*.json ./app
RUN npm install 
COPY ./ ./app
# CMD ["npm","run","dev"]
CMD ["npm","run","prod"]