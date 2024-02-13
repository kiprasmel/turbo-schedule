#!/usr/bin/env bash

REMOTE="${REMOTE:-prod}"

WORKSPACE_COMMIT_TAG="$(./get-commit-tag.sh)"
if [ -z "$TAG" ]; then
	printf "TAG not set. Which one to use?\n"
	# printf "[(L)atest/(W)orkspace commit]: "
	printf "[1] \"latest\"\n"
	printf "[2] workspace commit \"$WORKSPACE_COMMIT_TAG\""
	printf "\nEnter number 1-2\n"
	printf "> "

	read -r ans

	case "$ans" in
		1|L|l)
			TAG="latest"
			;;
		2|W|w|C|c)
			TAG="$WORKSPACE_COMMIT_TAG"
			;;
		*)
		 	printf "invalid choice\n"
			exit 1
			;;
	esac
fi

echo "TAG $TAG"

ssh -o BatchMode=yes -o AddKeysToAgent=no "$REMOTE" TAG=\"${TAG}\" 'bash -s' <<"EOF"

cd "./apps/turbo-schedule"
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

# will finish from local w/ deploy.sh
yarn docker:deploy:my-current-workspace:no-finish

exit

EOF

TAG="$TAG" ./deploy.sh
