FROM mcr.microsoft.com/playwright

ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]

RUN yarn install

COPY . .

RUN yarn build:esm

RUN npm config set update-notifier false

ARG EXAMPLE_FOLDER

WORKDIR /app/examples/${EXAMPLE_FOLDER}

RUN yarn install

EXPOSE 3000
EXPOSE 7777

CMD ["/bin/sh", "-c", "yarn dev & sleep 5 && cd /app && yarn test:e2e"]
