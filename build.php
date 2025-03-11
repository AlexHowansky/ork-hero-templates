#!/usr/bin/env php
<?php

if ($argc < 2) {
    printf("Usage: %s </path/to/template.hde>\n", $argv[0]);
    exit(1);
}

$output = file_get_contents('template.html') . str_replace(
    [
        '<!--CHARACTERISTICS_BLOCK-->',
        '<!--SKILLS_BLOCK-->',
        '<!--POWERS_BLOCK-->',
        '<!--DEFENSE_BLOCK-->',
        '<!--COMBAT_INFO_BLOCK-->',
        '<!--COMBAT_LEVELS_BLOCK-->',
        '<!--COMBAT_MANEAUVERS_BLOCK-->',
        '<!--RANGE_MODIFIERS_BLOCK-->',
        '/*CSS_BLOCK*/',
        '/*JAVASCRIPT_BLOCK*/'
    ],
    [
        file_get_contents('characteristics.html'),
        file_get_contents('skills.html'),
        file_get_contents('powers.html'),
        file_get_contents('defense.html'),
        file_get_contents('combat_info.html'),
        file_get_contents('combat_levels.html'),
        file_get_contents('combat_maneauvers.html'),
        file_get_contents('range_modifiers.html'),
        file_get_contents('page.css'),
        file_get_contents('page.js'),
    ],
    file_get_contents('page.html')
);

printf("Wrote %d bytes to %s\n", file_put_contents($argv[1], $output), $argv[1]);
