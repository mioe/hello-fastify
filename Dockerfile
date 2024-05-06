FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS install-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install

FROM base
COPY --from=install-deps /app/node_modules /app/node_modules
EXPOSE 3000
CMD [ "pnpm", "dev" ]
