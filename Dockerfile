# Etapa 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copia dependencias primero para aprovechar la cache
COPY package.json ./
RUN npm install

# Copia el resto del proyecto
COPY . .

# Compila la app Next.js
RUN npm run build

# Etapa 2: Producción
FROM node:18-alpine AS runner

# Establece la variable de entorno para producción
ENV NODE_ENV=production

WORKDIR /app

# Solo copias necesarias para producción
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.js ./next.config.js

# Expone el puerto que usa Next.js
EXPOSE 3000

# Comando para arrancar el servidor Next.js
CMD ["node_modules/.bin/next", "start"]
