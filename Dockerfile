FROM node:25.9.0-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine AS runtime
COPY --from=builder /app/dist /usr/share/nginx/html
# Desactivamos redirecciones absolutas para que no rompa el proxy
RUN sed -i 's/http {/http {\n    absolute_redirect off;/' /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
