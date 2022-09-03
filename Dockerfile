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


# Build image => docker build --rm -t boatui:v0 .
#To run the container => docker run -d -p 4200:80 boatui:v0
#Tag our image with repo in docker hub => docker tag boatui:v0 omarlo/first-repository-ui:v0
# Push our image => docker push omarlo/first-repository-ui:v0
