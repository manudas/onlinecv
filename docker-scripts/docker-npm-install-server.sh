#/bin/sh

# to be used to install node modules for the initial server install
DIR="$(dirname "$(dirname "$(realpath "$0")")"..)";
# echo "$DIR"/backend;

# pass a second parameter if you want to install a package
docker run -it -v "$DIR"/backend:/app/backend -v "$DIR"/backend-libs:/app/backend/backend-libs onlinecv-server /bin/sh -c "npm --prefix /app/backend install /app/backend/backend-libs/* $1"
docker system prune --force;
exit 0;
