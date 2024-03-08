#!/usr/bin/env bash

set -e
set -x

echo "in run-docker.sh"

TAG="${TAG:-$1}"
TAG=${TAG:-latest}

IMAGE_USER="kipras"
IMAGE_NAME="turbo-schedule"

IMAGE="$IMAGE_USER/$IMAGE_NAME:$TAG"

#docker login
docker pull "$IMAGE" || {
	docker image ls | grep "$TAG" || {
		>&2 printf "error: image with tag $TAG not found neither remote nor local...\n"
		exit 1
	}
}

HAD_OLD=0
docker ps | grep "$IMAGE_NAME" && {
	HAD_OLD=1
	docker stop "$IMAGE_NAME"
	docker rename "$IMAGE_NAME" "$IMAGE_NAME".old
}

docker run \
        -p 127.0.0.1:7000:5000 \
        --detach \
        --restart unless-stopped \
        --name "$IMAGE_NAME" \
        --mount source="$IMAGE_NAME"--generated,target=/usr/src/app/server/generated \
        --mount source="$IMAGE_NAME"--database,target=/usr/src/app/database/data \
		--env ARCHIVE_DEPLOY_KEY="$ARCHIVE_DEPLOY_KEY" \
		--env ARCHIVE_ENCRYPT_KEY="$ARCHIVE_ENCRYPT_KEY" \
        "$IMAGE"

test $HAD_OLD -eq 0 || docker rm "$IMAGE_NAME".old 2>/dev/null

