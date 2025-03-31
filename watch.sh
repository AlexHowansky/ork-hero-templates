#!/bin/bash

if ! which entr
then
    echo "The entr utility is not available. Run 'sudo apt install entr' or see http://eradman.com/entrproject/"
    exit 1
fi

clear
ls build.php page.* template.xml blocks/* layouts/* | entr ./build.php "${1}"
