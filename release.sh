#!/bin/bash

GIT_TAG_VERSION=$(git tag | sort -Vr | head -1)
echo "git tag version: ${GIT_TAG_VERSION}"
echo

CHANGELOG_VERSION=$(grep '^## \[' CHANGELOG.md | head -1 | cut -d ']' -f1 | cut -d '[' -f2)
echo "changelog version: ${CHANGELOG_VERSION}"
echo

echo "dist template version:"
for FILE in dist/*.hde
do
    echo -n "  ${FILE}: "
    grep '^Version: ' "${FILE}" | cut -d ' ' -f2
done
echo

echo "example template version:"
for FILE in examples/*.html
do
    echo -n "  ${FILE}: "
    grep '^Version: ' "${FILE}" | cut -d ' ' -f2
done
echo
