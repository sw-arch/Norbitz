#! /bin/bash
./dockerbuild.sh
gcloud docker -- push gcr.io/norbitz-185522/web-frontend
gcloud container clusters get-credentials web-frontend --zone us-central1-a --project norbitz-185522
kubectl delete `kubectl get pods -o name | grep web-frontend`
