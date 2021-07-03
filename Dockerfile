FROM node:12

RUN apt-get update -y \
    && apt-get install -y python openjdk-8-jdk zip \
    && mkdir -p /usr/src/app \
    && chown -R node:node /usr/src/app

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY --chown=node:node . .

USER node

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
#COPY --chown=node:node artifacts/ ./

RUN npm run build

RUN zip -r build.zip build/*

# docker run --rm -it  reactbuild
