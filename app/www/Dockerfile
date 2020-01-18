FROM node:10.16.0-alpine

# ENV NODE_ENV "production"
# ENV APP_ENV "production"
# ENV NUXT_HOST "0.0.0.0"
# ENV NUXT_PORT "8000"
ENV TZ "Asia/Bangkok"

RUN apk --no-cache add curl g++ gcc libgcc libstdc++ linux-headers make python

RUN curl -o- -L https://yarnpkg.com/install.sh | sh

WORKDIR /app

COPY . .
# RUN yarn --frozen-lockfile --production

RUN yarn build

CMD yarn start
