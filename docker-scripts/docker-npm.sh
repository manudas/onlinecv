#/bin/sh

# use mode: docker-npm project npm-command-in-package.json
#
# $1 would be either frontend, backend or backend-ui
#
# $2 would tipically be start or run. It could also
# be install, remove and all kind of npm commands
# related to the project
#
# $3 would be any of the scripts defined in package.json
# file, such us start, build, test, and so on... It could
# also be installation parameters for install command in ($2)
# like --save-dev or the package to be installed if no
# parameter was specified
#
# $$ could be the name of the package to be installed when
# an installation parameter was specified
#
docker exec -it server sh -c "npm --prefix /app/dev/webroot/$1 $2 $3 $4";
exit 0;