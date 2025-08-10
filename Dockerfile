# Use Bun's official image for better performance
FROM oven/bun:1-alpine AS base

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN bun run build

# Production stage
FROM oven/bun:1-alpine AS production

# Install react-router-serve globally
RUN bun add -g @react-router/serve

# Set working directory
WORKDIR /app

# Copy built application
COPY --from=base /app/build ./build

# Copy package.json for serve command
COPY --from=base /app/package.json ./

# Expose port
EXPOSE 3000

# Start the application using react-router-serve
CMD ["bunx", "@react-router/serve", "./build/server/index.js"]