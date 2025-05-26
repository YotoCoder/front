FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy only package.json (not lock files)
COPY package.json ./

# Install dependencies with npm
RUN npm install

# Copy source code
COPY . .

# Expose the app on port 4000
EXPOSE 4000

# Default command
CMD ["npm", "start"]
