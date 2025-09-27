FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install 
COPY . .
ARG NEXT_PUBLIC_API_URL=http://backend:8080
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
RUN npm run build
FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
EXPOSE 3000
CMD ["npm", "start"]