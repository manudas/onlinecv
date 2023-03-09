#!/usr/bin/env bash

if [ "${1}" == 'certbot' ]; then
  if [ -z "${DOCKMAIL}" ]; then
    echo "ERROR: administrator email is mandatory"
  elif [ -z "${DOCKDOMAINS}" ]; then
    echo "ERROR: at least one domain must be specified"
  else
    ## DEBUGGING COMMAND:
    # exec certbot certonly --verbose --noninteractive --webroot -w /webroot --agree-tos --email="test@manu.link" -d "manu.link" --test-cert --debug-challenges
    exec certbot certonly --verbose --noninteractive --quiet --webroot -w /var/www/your-domain.com/ --agree-tos --email="${DOCKMAIL}" -d "${DOCKDOMAINS}"
  fi
elif [ "${1}" == 'certbot-renew' ]; then
   exec certbot renew
else
  "$@"
fi