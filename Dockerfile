FROM node:lts-alpine

WORKDIR /app

ENV PORT 8080
ENV HOST 0.0.0.0

RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      nodejs \
      yarn

COPY package.json .
COPY yarn.lock .

RUN yarn install

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

RUN yarn add puppeteer@2.0.0

RUN addgroup -S pptruser && adduser -S -g pptruser pptruser \
    && mkdir -p /home/pptruser/Downloads /app \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /app

COPY . .

EXPOSE 8080
CMD yarn start

USER pptruser