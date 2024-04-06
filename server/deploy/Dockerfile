FROM --platform=linux/amd64 node:current-alpine

WORKDIR /app

COPY ../ ./

RUN npm i -g pnpm

RUN pnpm i

RUN pnpm build

COPY ../ ./

EXPOSE 8000

CMD ["pnpm", "start"]