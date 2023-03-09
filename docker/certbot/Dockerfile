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

### Start certbot
COPY ./docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["certbot"]