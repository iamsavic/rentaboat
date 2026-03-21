FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Prisma
COPY prisma ./prisma
RUN npx prisma generate

# App source
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
