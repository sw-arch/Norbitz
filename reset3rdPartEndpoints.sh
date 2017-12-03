#! /bin/bash

# AirDND
curl --request POST \
  --url http://35.193.67.106/AirDND/AirDND/1.0.5/reset

# Carnivore
curl --request PUT \
  --url http://35.196.221.242/system/reset

# Delter
curl --request DELETE \
  --url http://35.193.165.105/api/v1.2.1/reset

# Hilbun
curl --request POST \
  --url http://35.196.7.68:3000/reset

# Hurts
curl --request PATCH \
  --url http://softwarebois.com/inventory

# Scandals
curl --request POST \
  --url http://35.196.71.129/reset

