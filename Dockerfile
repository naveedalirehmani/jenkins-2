# ---------- BUILD STAGE ----------
    FROM node:20-alpine AS builder

    WORKDIR /app
    
    # Install deps
    COPY package*.json ./
    RUN npm install
    
    # Copy source & build
    COPY tsconfig.json ./
    COPY src ./src
    RUN npm run build
    
    # ---------- PRODUCTION STAGE ----------
    FROM node:20-alpine
    
    WORKDIR /app
    
    # Copy only production deps
    COPY package*.json ./
    RUN npm install --omit=dev
    
    # Copy built app
    COPY --from=builder /app/dist ./dist
    
    # Expose port (match your server)
    EXPOSE 3000
    
    # Start app
    CMD ["node", "dist/server.js"]
    