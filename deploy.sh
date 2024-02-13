#!/usr/bin/env bash

REMOTE="${REMOTE:-prod}"

TAG="${TAG:-$1}"
TAG=${TAG:-latest}

echo "TAG $TAG"

ARCHIVE_DEPLOY_KEY_PATH="$HOME/.ssh/turbo-schedule-archive-deploy"
if [ -f "$ARCHIVE_DEPLOY_KEY_PATH" ]; then
	ARCHIVE_DEPLOY_KEY="$(cat "$ARCHIVE_DEPLOY_KEY_PATH")"
	echo "ARCHIVE_DEPLOY_KEY found."
else
	echo "ARCHIVE_DEPLOY_KEY not found. tried $ARCHIVE_DEPLOY_KEY_PATH"
fi

if [ -n "$ARCHIVE_GIT_REMOTE_URL" ]; then
	echo "ARCHIVE_GIT_REMOTE_URL set"
else
	echo "ARCHIVE_GIT_REMOTE_URL not set"
fi

ssh -o BatchMode=yes -o AddKeysToAgent=no "$REMOTE" \
	"TAG=\"${TAG}\"" \
	"ARCHIVE_DEPLOY_KEY=\"${ARCHIVE_DEPLOY_KEY}\"" \
	"ARCHIVE_GIT_REMOTE_URL=\"$ARCHIVE_GIT_REMOTE_URL\"" \
	'bash -s' <<"EOF"

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
		--env ARCHIVE_DEPLOY_KEY="$ARCHIVE_DEPLOY_KEY" \
        "$IMAGE"

docker rm "$IMAGE_NAME".old 2>/dev/null

exit

EOF
