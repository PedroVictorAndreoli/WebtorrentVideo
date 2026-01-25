FROM node:20-bullseye

RUN apt-get update && \
    apt-get install -y build-essential python3 cmake git && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .

ENV NODE_ENV=production
ENV PORT=3001

EXPOSE 3001

CMD ["node", "src/server/index.mjs"]
