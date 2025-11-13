FROM alpine:latest

RUN apk add --no-cache curl busybox-suid

COPY packages/content/sync.sh /sync.sh
RUN chmod +x /sync.sh

RUN echo "PATH=/usr/sbin:/usr/bin:/sbin:/bin" > /etc/crontabs/root && \
  echo "0 10,16,22,4 * * * /sync.sh" >> /etc/crontabs/root

CMD ["crond", "-f", "-l", "0", "-L", "/dev/stdout"]
