# Use the official Node.js 22 image.
# https://hub.docker.com/_/node
FROM node:22-slim

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json and package-lock.json are copied.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy local code to the container image.
COPY . .

# Build the application.
RUN npm run build

# TanStack Start's vite preview server expects server.js in dist/server
RUN cp dist/server/index.js dist/server/server.js

# Expose the port that the app will run on.
EXPOSE 8080

# Run the web service on container startup.
CMD [ "npm", "run", "start" ]
