#! /bin/bash

# Pass the version number as an argument, eg: ./getServer.sh 1.1.1

docker run --rm -v "${PWD}":/local swaggerapi/swagger-codegen-cli generate \
    -i "https://app.swaggerhub.com/apiproxy/schema/file/sw-arch/Norbitz/$1/swagger.json" \
    -l python-flask \
    -o /local
sudo chown $USER:$USER -R .
