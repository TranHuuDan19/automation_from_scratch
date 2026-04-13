FROM mcr.microsoft.com/playwright:v1.45.0-jammy

WORKDIR /app

# Cache dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Install only chromium
RUN npx playwright install chromium

CMD ["npx", "playwright", "test"]