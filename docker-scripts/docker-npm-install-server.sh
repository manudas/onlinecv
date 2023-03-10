#/bin/sh

# to be used to install node modules for the initial server install
DIR="$(dirname "$(dirname "$(realpath "$0")")"..)";
# echo "$DIR"/backend;

docker run -it -v "$DIR"/backend:/app/backend onlinecv-server /bin/sh -c "npm --prefix /app/backend install";
docker system prune --force;
exit 0;
