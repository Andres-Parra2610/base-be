FROM node:22-alpine AS base

RUN apk update && apk add --no-cache libc6-compat dumb-init
RUN corepack enable && corepack prepare pnpm@latest --activate
ENV PNPM_HOME="/pnpm"
ENV PATH=$PNPM_HOME:$PATH
ENV CI=true
ENV DIR=usr/src/app
WORKDIR $DIR


FROM base AS build
COPY package.json .
COPY pnpm-lock.yaml .

RUN pnpm install --frozen-lockfile

COPY tsconfig*.json .
COPY .swcrc .
COPY nest-cli.json .    
COPY src ./src

RUN pnpm run build && \
    pnpm prune --production

FROM base AS production
ENV NODE_ENV=production
ENV USER=node

COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init
COPY --from=build $DIR/package.json .
COPY --from=build $DIR/pnpm-lock.yaml .
COPY --from=build $DIR/node_modules ./node_modules
COPY --from=build $DIR/dist ./dist

USER $USER
EXPOSE $PORT

CMD ["dumb-init", "node", "dist/main.js"]

