# Etape 1
FROM node:latest as node
WORKDIR /app
#COPY package*.json ./
COPY . .
RUN npm install
RUN npm run build --prod

#Etape 2
FROM nginx:alpine
COPY --from=node /app/dist/boatui /usr/share/nginx/html


#To run the container => docker run -d -p 4200:80 boatui:v0
