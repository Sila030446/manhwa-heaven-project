# Use the official Node.js image
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Create the production image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app ./

# Install only production dependencies
RUN npm install --only=production

# Expose the port that the application will run on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
