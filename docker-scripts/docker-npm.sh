#/bin/sh

# use mode: docker-npm project npm-command-in-package.json
#
# $1 would be either frontend, backend or backend-ui
#
# $2 would tipically be start or run
#
# $3 would be any of the scripts defined in package.json
# file, such us start, build, test, and so on...
#
docker exec -it server sh -c "npm --prefix /app/dev/webroot/$1 $2 $3";
exit 0;