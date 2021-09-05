# Dockerfile
#
# NOTE - this assumes you've already ran `yarn setup`!
# TODO - multi-stage builds
#
# name=turbo-schedule
#
# building:
# $ docker build -t kipras/$name:vX.Y.Z .
#
# running standalone:
# $ docker run -p 5000:5000 kipras/$name
#
#

FROM node:12 as node

ENV workdir=/usr/src/app

WORKDIR ${workdir}

# root dir
COPY package.json yarn.lock ./

# packages
COPY common/package.json ./common/
COPY database/package.json ./database/
COPY scraper/package.json ./scraper/
COPY server/package.json ./server/
COPY client/package.json ./client/
COPY use-fetched-state/package.json ./use-fetched-state/

# TODO - cannot use `--production`,
# since `node-sass` won't get installed in react app
# meaning that the app won't compile
###RUN yarn install --production
###RUN yarn install --frozen-lockfile

COPY ./node_modules ./node_modules

COPY common/dist ./common/dist
COPY database/dist ./database/dist
COPY scraper/dist ./scraper/dist
COPY server/dist ./server/dist
COPY client/build ./client/build
COPY use-fetched-state/dist ./use-fetched-state/dist

COPY database/data ./database/data

# not yet needed
#COPY server/.env ./server/.env

ENV NODE_ENV=production

EXPOSE 5000

# ### NOTE - This is not ran doing build-time, meaning
# ### that if there're any errors - you won't be notified!
CMD [ "yarn", "serve" ]
