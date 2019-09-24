# Dockerfile
#
# name=turbo-schedule
#
# building:
# $ docker build -t kipras/$name:vX.Y.Z .
#
# running standalone:
# $ docker run -p 5000:5000 kipras/$name
#
# TODO - multi-stage builds
#

FROM node as node

ENV workdir=/usr/src/app

WORKDIR ${workdir}

# root dir
COPY package.json yarn.lock ./

# packages
COPY common/package.json ./common/
COPY scraper/package.json ./scraper/
COPY server/package.json ./server/
COPY client/package.json ./client/

# TODO - cannot use `--production`,
# since `node-sass` won't get installed in react app
# meaning that the app won't compile
###RUN yarn install --production
RUN yarn install

COPY common/dist ./common/dist
COPY scraper/dist ./scraper/dist
COPY server/dist ./server/dist
COPY client/build ./client/build

# TODO FIXME - this is hacky (((OR IS IT???)))
# RUN yarn --cwd server run __postinstall
RUN node server/dist/predeploy.js

# not yet needed
#COPY .env ...

ENV NODE_ENV=production

EXPOSE 5000

# ### NOTE - This is not ran doing build-time, meaning
# ### that if there're any errors - you won't be notified!
CMD [ "yarn", "serve" ]
