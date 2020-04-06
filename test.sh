#!/usr/bin/env sh
# test.sh

rm -rf database/data.test/
mkdir -p database/data.test/
yarn --cwd server test

