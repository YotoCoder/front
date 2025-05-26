# Etapa 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copiamos archivos de dependencias primero
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copiamos el resto del código
COPY . .

# Compilamos la app Next.js
RUN yarn build

# Etapa 2: Producción
FROM node:18-alpine AS runner

ENV NODE_ENV=production

WORKDIR /app

# Copiamos solo lo necesario
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.js ./next.config.js

# Puerto en producción
EXPOSE 4000

# Comando para iniciar el servidor Next.js en el puerto 4000
CMD ["yarn", "start", "-p", "4000"]
