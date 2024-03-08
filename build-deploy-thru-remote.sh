#!/usr/bin/env bash

set -eu

. ./lib.sh

TAG="${TAG:-}"

WORKSPACE_COMMIT_TAG="$(./get-commit-tag.sh)"
if [ -z "$TAG" ]; then
	printf "TAG not set.\nUse workspace commit? [Y/n] "
	read -r ans
	case "$ans" in
		""|y|Y|yes)
			TAG="$WORKSPACE_COMMIT_TAG"
			;;
		n|N|no)
			printf "\nInsert tag: "
			read -r ans
			TAG="$ans"
			;;
		*)
			printf "\nInvalid choice.\n"
			exit 1
			;;
	esac
fi

echo "TAG '$TAG'"

BRANCH="$(git branch --show-current)"
echo "BRANCH '$BRANCH'"

get_set_cache "REMOTE"
REMOTE="$CACHE_VALUE"
echo "REMOTE '$REMOTE' (from $CACHE_PATH)"

ssh -o BatchMode=yes -o AddKeysToAgent=no "$REMOTE" \
	TAG=\"${TAG}\" \
	BRANCH=\"${BRANCH}\" \
	"ROOTDIR=${ROOTDIR}" \
	'bash -l -s' <<"EOF"
set -eux

cd "$ROOTDIR"
git fetch origin "+refs/heads/*:refs/remotes/origin/*"
git checkout "$BRANCH"
git pull --rebase || exit 1

# TODO: only docker:build instead of docker:deploy to avoid even needing a login to push
#
# expected exit w/ error
#
# previously tried to grab the tag, but i don't think i can return it from the ssh call anyway?
#TAG="$(yarn docker:deploy:my-current-workspace | grep TAG | cut -d ' ' -f 2)"
#
#

echo "TAG in remote: $TAG"

yarn setup

# will finish from local w/ deploy.sh
yarn docker:deploy:my-current-workspace:no-finish

EOF

TAG="$TAG" ./deploy.sh
