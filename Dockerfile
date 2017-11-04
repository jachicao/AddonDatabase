# Dockerfile
FROM node:7.2-onbuild

RUN npm install pm2 -g

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

# Build and optimize react app
RUN npm run build

EXPOSE 80 443

# defined in package.json
CMD ["pm2-docker", "server"]
