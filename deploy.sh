#!/usr/bin/env bash
npm run test
npm run build
docker build -t gcr.io/trusty-solution-256615/ski-free-game:score .
# gcloud auth configure-docker - run once
docker push gcr.io/trusty-solution-256615/ski-free-game
kubectl apply -f kubernetes/deployment.yml