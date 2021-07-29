FROM mcr.microsoft.com/playwright

ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]

RUN yarn install

COPY . .

RUN yarn build:esm

RUN npm config set update-notifier false

ARG EXAMPLE_FOLDER
ENV EXAMPLE_FOLDER=$EXAMPLE_FOLDER

WORKDIR /app/examples/${EXAMPLE_FOLDER}

RUN yarn install

ARG INIT_COMMAND="start"
ENV INIT_COMMAND=$INIT_COMMAND

RUN test "$INIT_COMMAND" = "start" && yarn build || exit 0

EXPOSE 3000
EXPOSE 7777

CMD ["/bin/sh", "-c", "yarn $INIT_COMMAND & sleep 5 && cd /app && yarn test:e2e"]
