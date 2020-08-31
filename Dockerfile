FROM nginx:mainline-alpine
COPY static/ /srv/
COPY nginx/ /etc/nginx/
