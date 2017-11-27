docker run --rm -v "${PWD}":/local swaggerapi/swagger-codegen-cli generate \
    -i "$1" \
    -l typescript-angular \
    -o /local/"$1"
sudo chown $USER:$USER -R "https:"
