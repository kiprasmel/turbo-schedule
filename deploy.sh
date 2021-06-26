#!/usr/bin/env bash

REMOTE="${REMOTE:-prod}"

TAG="${TAG:-$1}"
TAG=${TAG:-latest}

echo "TAG $TAG"

ssh -o BatchMode=yes -o AddKeysToAgent=no "$REMOTE" "TAG=\"${TAG}\" " 'bash -s' <<"EOF"

IMAGE_USER="kipras"
IMAGE_NAME="turbo-schedule"

IMAGE="$IMAGE_USER/$IMAGE_NAME:$TAG"

docker login
docker pull "$IMAGE"

docker stop "$IMAGE_NAME"
docker rename "$IMAGE_NAME" "$IMAGE_NAME".old

docker run \
        -p 127.0.0.1:7000:5000 \
        --detach \
        --restart unless-stopped \
        --name "$IMAGE_NAME" \
        --mount source="$IMAGE_NAME"--generated,target=/usr/src/app/server/generated \
        --mount source="$IMAGE_NAME"--database,target=/usr/src/app/database/data \
        "$IMAGE"

docker rm "$IMAGE_NAME".old 2>/dev/null

exit

EOF
