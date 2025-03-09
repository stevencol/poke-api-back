# Etapa 1: Construcción de la aplicación
FROM node:20.18.3 AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20.18.3

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist /usr/src/app/dist
COPY --from=builder /usr/src/app/package*.json /usr/src/app/

RUN npm install --only=production

COPY .env .env

EXPOSE 3000

CMD ["node", "dist/main"]