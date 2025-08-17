FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json .
RUN npm ci --omit=dev

COPY pages pages
COPY public public
COPY src src
COPY next.config.js .
COPY tsconfig.json .

ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_ENCRYPTION_KEY
ARG NEXT_PUBLIC_ENCRYPTION_IV

ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_ENCRYPTION_KEY=$NEXT_PUBLIC_ENCRYPTION_KEY
ENV NEXT_PUBLIC_ENCRYPTION_IV=$NEXT_PUBLIC_ENCRYPTION_IV

RUN npm run build

FROM node:22-alpine AS runner

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev --prefer-offline

COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/next.config.js .

EXPOSE 3000

ENTRYPOINT ["npm", "start"]