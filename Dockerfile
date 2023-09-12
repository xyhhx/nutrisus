FROM node:20 as build
RUN npm i -g pnpm
WORKDIR /app
COPY package.json .
RUN pnpm i
COPY . .
RUN pnpm run build
ENV NODE_ENV=production


FROM gcr.io/distroless/nodejs20-debian11
COPY --from=build /app /app
WORKDIR /app
CMD ["server.js"]
