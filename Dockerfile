FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Expose the application port
EXPOSE 4000

# Default command (optional if handled by docker-compose)
CMD ["yarn", "start"]
