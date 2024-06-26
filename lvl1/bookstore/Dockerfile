FROM node:20.10-alpine
WORKDIR /app

# ARG NODE_ENV=production

COPY ./*.json ./
RUN npm install 
COPY ./ ./
CMD ["npm","run","dev"]
# CMD ["npm","run","prod"]