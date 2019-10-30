#!/usr/bin/env bash
npm run build
docker build -t gcr.io/trusty-solution-256615/ski-free-game .
gcloud auth configure-docker
#docker login -u _json_key -p "$(cat /home/komen/Downloads/permissions.json)" https://gcr.io #only run once (the path is path to the credentials file -got from google IMA and Admin)
docker push gcr.io/trusty-solution-256615/ski-free-game