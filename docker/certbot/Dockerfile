FROM alpine:3.17.0
LABEL maintainer "Manuel José Pulgar Anguita"

### Install Application
RUN set -x && \
    apk --no-cache upgrade && \
    apk add --no-cache --virtual=run-deps \
      certbot \
      bash \
    && \
    rm -rf /tmp/* \
           /var/cache/apk/*  \
           /var/tmp/*

### Volume
VOLUME ["/etc/letsencrypt"]
VOLUME ["/webroot"]

### Auto certificate renewal crontab
RUN echo "0 */12 * * * test -x /usr/bin/certbot -a \! -d /run/systemd/system && certbot renew > /proc/1/fd/1 2>&1" >> /etc/crontabs/root
### Start certbot
COPY ./docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["certbot"]