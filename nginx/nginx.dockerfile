FROM nginx:alpine

COPY ./nginx.conf /etc/nginx/nginx.conf

COPY ./products.conf /etc/nginx/products.conf

COPY ./index.html /usr/share/nginx/html

COPY ./.htpasswd /etc/nginx/.htpasswd

RUN rm -rf /usr/share/nginx/html/*

ADD build /usr/share/nginx/html

EXPOSE 80 443