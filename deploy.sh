#!/usr/bin/env bash

set -e

. ./lib.sh

TAG="${TAG:-$1}"
TAG=${TAG:-latest}
echo "TAG $TAG"

get_set_cache "REMOTE"
REMOTE="$CACHE_VALUE"
echo "REMOTE '$REMOTE' (from $CACHE_PATH)"

ARCHIVE_ENCRYPT_KEY_PATH="$HOME/.gnupg/turbo-schedule-archive.pub.asc"
if [ -f "$ARCHIVE_ENCRYPT_KEY_PATH" ]; then
	ARCHIVE_ENCRYPT_KEY="$(cat "$ARCHIVE_ENCRYPT_KEY_PATH")"
	echo "ARCHIVE_ENCRYPT_KEY found."
else
	echo "ARCHIVE_ENCRYPT_KEY not found. tried $ARCHIVE_ENCRYPT_KEY_PATH"
fi

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
	"ARCHIVE_ENCRYPT_KEY=\"${ARCHIVE_ENCRYPT_KEY}\"" \
	"ARCHIVE_DEPLOY_KEY=\"${ARCHIVE_DEPLOY_KEY}\"" \
	"ARCHIVE_GIT_REMOTE_URL=\"${ARCHIVE_GIT_REMOTE_URL}\"" \
	"ROOTDIR=${ROOTDIR}" \
	'bash -s' <<"EOF"
set -e

cd $ROOTDIR
./run-docker.sh

exit

EOF

printf "%s\n" "$TAG" >> .git/LAST_DEPLOY_TAG

