#!/bin/bash -euf

# Needed for experimental releases
npm version "$RELEASE_VERSION" --git-tag-version false

npm publish --provenance --access public
