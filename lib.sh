#!/usr/bin/env bash

export ROOTDIR="~/infra/server/turbo-schedule/turbo-schedule.git"

CACHE_PATH=
CACHE_VALUE=
get_set_cache() {
	local var="$1"
	CACHE_PATH=".git/$var"

	test -f "$CACHE_PATH" || {
		>&2 printf "Provide %s (will be cached to '%s'):\n> " "$var" "$CACHE_PATH"
		read -r ans
		printf "%s" "$ans" > "$CACHE_PATH"
	}

	CACHE_VALUE="$(cat "$CACHE_PATH")"
}

