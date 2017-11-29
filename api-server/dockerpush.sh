#! /bin/bash
./dockerbuild.sh
gcloud docker -- push gcr.io/norbitz-185522/api-server
gcloud container clusters get-credentials api-cluster --zone us-central1-a --project norbitz-185522
kubectl delete `kubectl get pods -o name | grep api-server`
