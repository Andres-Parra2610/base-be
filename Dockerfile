FROM node:22-alpine

RUN apk update && apk add --no-cache libc6-compat dumb-init
RUN corepack enable && corepack prepare pnpm@latest --activate
ENV PNPM_HOME="/pnpm"
ENV PATH=$PNPM_HOME:$PATH
ENV CI=true

WORKDIR /usr/src/app

COPY . /usr/src/app/
RUN pnpm install --frozen-lockfile

RUN pnpm run build && \
    pnpm prune --production

EXPOSE 3000

CMD ["dumb-init", "node", "dist/main.js"]

