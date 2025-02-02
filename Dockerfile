# Kita uses Node and Vue
# node:alpine is a slim Node installed linux vm
FROM node:16-alpine

# Create an application directories
RUN mkdir -p /app/frontend
RUN mkdir -p /app/backend

# changes working directory to /app/frontend
WORKDIR /app/frontend

# Copy the frontend package and package-lock.json file
COPY smartkita-frontend/package*.json ./

# Install node packages
RUN npm install

# Copy or project directory (locally) in the current directory of our docker image (/app)
COPY smartkita-frontend/ .

# Build the app
RUN npm run build

# changes working directory to /app/backend
WORKDIR /app/backend

# Copy the backend package and package-lock.json file
COPY smartkita-backend/package*.json ./
COPY smartkita-backend/prisma/schema.prisma ./prisma/

# Install node packages
RUN npm install

RUN npx prisma generate

RUN npm install

# Copy or project directory (locally) in the current directory of our docker image (/app)
COPY smartkita-backend/ .

# starts server
CMD ["npm", "run", "start"]
