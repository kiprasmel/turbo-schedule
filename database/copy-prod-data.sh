#!/usr/bin/env bash

set -x

REMOTE="${REMOTE:-prod}"
FILENAME="${FILENAME:-latest.json}"

ssh -o BatchMode=yes -o AddKeysToAgent=no "$REMOTE" <<"EOF"
docker cp turbo-schedule:/usr/src/app/database/data/"$FILENAME" /tmp/
EOF

ROOTDIR="$(dirname "$0")"
DIR="$ROOTDIR/data"

mkdir -p "$DIR"

EXISTING_FILEPATH="$DIR/$FILENAME"
test -f "$EXISTING_FILEPATH" && rm "$EXISTING_FILEPATH"
scp -r "$REMOTE":/tmp/"$FILENAME" "$DIR/$FILENAME"

