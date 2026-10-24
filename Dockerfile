# Apache-2.0; author: Abu Salah Musha Lemon
# Nginx non-root image exposes port 8080.
FROM nginxinc/nginx-unprivileged:stable-alpine

LABEL org.opencontainers.image.title="ERP Pro Admin Panel" \
      org.opencontainers.image.description="Static ERP and POS frontend demo" \
      org.opencontainers.image.source="https://github.com/Abu-Salah-Musha-Lemon/ERP-Pro-Admin-Panel" \
      org.opencontainers.image.licenses="Apache-2.0" \
      org.opencontainers.image.authors="Abu Salah Musha Lemon"

COPY --chown=nginx:nginx *.html /usr/share/nginx/html/
COPY --chown=nginx:nginx assets/ /usr/share/nginx/html/assets/
COPY --chown=nginx:nginx LICENSE NOTICE /usr/share/nginx/html/

EXPOSE 8080
