#!/bin/bash

yarn && \
yarn run build-prod && \
docker-compose up

