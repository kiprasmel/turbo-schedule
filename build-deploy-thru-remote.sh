#!/usr/bin/env bash

set -eu

get_set_cache() {
	VAR="$1"
	STORE_PATH=".git/$VAR"

	test -f "$STORE_PATH" || {
		>&2 printf "Provide %s (will be cached to '%s'):\n> " "$VAR" "$STORE_PATH"
		read -r ans
		printf "%s" "$ans" > "$STORE_PATH"
	}

	cat "$STORE_PATH"
}

REMOTE="$(get_set_cache "REMOTE")"
echo "Using remote '$REMOTE'"

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

echo "TAG $TAG"

ssh -o BatchMode=yes -o AddKeysToAgent=no "$REMOTE" TAG=\"${TAG}\" 'bash -l -s' <<"EOF"
set -eux

cd "$HOME/infra/server/turbo-schedule/turbo-schedule.git"
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

exit

EOF

TAG="$TAG" ./deploy.sh
