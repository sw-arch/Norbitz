#! /bin/bash
./dockerbuild.sh
gcloud docker -- push gcr.io/norbitz-185522/api-server
