# Use the official Node.js 14 image as the base image
FROM node:19-alpine

# Set the working directory inside the container
WORKDIR /app/frontend

# Copy package.json and yarn.lock to the working directory
COPY package*.json .

# Install dependencies using Yarn package manager
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Set the command to start the application
CMD ["npm","run","dev"]
