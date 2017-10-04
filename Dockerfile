FROM node:8
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN yarn install && yarn build:production \
    && rm -rf src/ && rm yarn.lock && rm tsconfig.json && rm webpack.config.js \
    && rm -rf node_modules/
EXPOSE 3000
RUN yarn global add lite-server --dev && yarn global add cross-env
CMD ["yarn", "run:production"]
 