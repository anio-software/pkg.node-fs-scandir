#!/bin/bash -euf

# Needed for experimental releases
# --allow-same-version to make normal releases work (where version is already set in package.json)
npm version "$RELEASE_VERSION" --git-tag-version false --allow-same-version

npm publish --provenance --access public
