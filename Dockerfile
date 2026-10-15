# Use official Node.js runtime as parent image
FROM node:20-alpine

# Set the working directory inside container
WORKDIR /app

# Copy dependency configuration files
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy application source files
COPY . .

# Expose port the server listens on
EXPOSE 5000

# Set production environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Command to execute server startup
CMD ["node", "server.js"]
