# Apache-2.0; author: Abu Salah Musha Lemon
# Nginx official unprivileged image, stable NGINX 1.30.6 on Alpine; port 8080.
# Registry changed from legacy nginxinc to nginx namespace in upstream releases.
FROM nginx/nginx-unprivileged:1.30.6-alpine

LABEL org.opencontainers.image.title="ERP Pro Admin Panel" \
      org.opencontainers.image.description="Static ERP and POS frontend demo" \
      org.opencontainers.image.source="https://github.com/Abu-Salah-Musha-Lemon/ERP-Pro-Admin-Panel" \
      org.opencontainers.image.licenses="Apache-2.0" \
      org.opencontainers.image.authors="Abu Salah Musha Lemon"

COPY --chown=nginx:nginx *.html /usr/share/nginx/html/
COPY --chown=nginx:nginx assets/ /usr/share/nginx/html/assets/
COPY --chown=nginx:nginx LICENSE NOTICE /usr/share/nginx/html/

EXPOSE 8080
