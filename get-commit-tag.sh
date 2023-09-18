#!/bin/sh

TAG="${TAG:-$(git rev-parse HEAD)$VERSION_SUFFIX}"
printf "$TAG"
