#!/usr/bin/env bash

if [ "${1}" == 'certbot' ]; then
  if [ -z "${email}" ]; then
    echo "ERROR: administrator email is mandatory"
  elif [ -z "${domain}" ]; then
    echo "ERROR: at least one domain must be specified"
  else
    ## DEBUGGING COMMAND:
    if [ "${debug}"  == 'true' ]; then
        certbot certonly --verbose --noninteractive --webroot -w /webroot --agree-tos --email="${email}" -d "${domain}" --cert-name "${domain}" --test-cert --debug-challenges
    else
        certbot certonly --verbose --noninteractive --webroot -w /webroot --agree-tos --email="${email}" -d "${domain}" --cert-name "${domain}"
    fi
    exec crond -f -l 2
  fi
elif [ "${1}" == 'certbot-renew' ]; then
   exec certbot renew
else
  "$@"
fi