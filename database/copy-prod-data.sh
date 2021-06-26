#!/usr/bin/env bash

REMOTE="${1:-prod}"

ssh -o BatchMode=yes -o AddKeysToAgent=no "$REMOTE" <<"EOF"
docker cp turbo-schedule:/usr/src/app/database/data/latest.json /tmp/latest.json
EOF

DIR="$(dirname "$0")"

rm "$DIR"/data/latest.json
scp -r "$REMOTE":/tmp/latest.json "$DIR"/data/
