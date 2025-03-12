#!/bin/bash

[ -f .env ] && . .env

if ! which entr
then
    echo "The entr utility is not available. Run 'sudo apt install entr' or see http://eradman.com/entrproject/"
    exit 1
fi

if [ -z "${BUILD_TARGET_DIR}" ]
then
    echo "BUILD_TARGET_DIR is not set. Copy .env.dist to .env and edit as needed."
    exit 1
fi

if [ ! -w "${BUILD_TARGET_DIR}" ]
then
    echo "BUILD_TARGET_DIR is not writable. Check permissions."
    exit 1
fi

clear
ls *.html *.html *.js *.css blocks/* layouts/* | entr ./build.php "${BUILD_TARGET_DIR}"
