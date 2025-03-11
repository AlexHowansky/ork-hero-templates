#!/usr/bin/env php
<?php

if ($argc < 2) {
    printf("Usage: %s </path/to/template.hde>\n", $argv[0]);
    exit(1);
}

$output = file_get_contents('template.html') . file_get_contents('page.html');

$blocks = glob('blocks/*.html');
$output = str_replace(
    array_map(fn(string $file): string => sprintf('<!--%s_BLOCK-->', strtoupper(basename($file, '.html'))), $blocks),
    array_map(fn(string $file): string => file_get_contents($file), $blocks),
    $output
);

$blocks = ['css', 'js'];
$output = str_replace(
    array_map(fn(string $block): string => sprintf('/*%s_BLOCK*/', strtoupper($block)), $blocks),
    array_map(fn(string $block): string => file_get_contents(sprintf('page.%s', $block)), $blocks),
    $output
);

printf("Wrote %d bytes to %s\n", file_put_contents($argv[1], $output), $argv[1]);
