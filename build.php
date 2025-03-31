#!/usr/bin/env php
<?php

require_once 'vendor/autoload.php';

use Dom\HTMLDocument;
use MatthiasMullie\Minify\CSS;
use MatthiasMullie\Minify\JS;

libxml_use_internal_errors(true);

foreach (glob('layouts/*.html') as $layoutFileHtml) {
    $output = file_get_contents('page.html');
    $output = str_replace('<!--LAYOUT-->', file_get_contents($layoutFileHtml), $output);
    $output = str_replace('/*CSS*/', new CSS('page.css')->minify(), $output);
    $output = str_replace('/*CUSTOM_CSS*/', '<!--CAMPAIGN_USE--><!--/CAMPAIGN_USE-->', $output);
    $output = str_replace('/*JS*/', new JS('page.js')->minify(), $output);
    $blocks = glob('blocks/*.html');
    $output = str_replace(
        array_map(fn(string $file): string => sprintf('<!--%s_BLOCK-->', strtoupper(basename($file, '.html'))), $blocks),
        array_map(fn(string $file): string => file_get_contents($file), $blocks),
        $output
    );
    $output = preg_replace('/^ +/m', '', $output);
    $outputFile = sprintf(
        '%s/Ork-%s.hde',
        rtrim($argv[1] ?? './dist' ?: './dist', '/'),
        ucfirst(basename($layoutFileHtml, '.html'))
    );
    HTMLDocument::createFromString($output);
    $errors = libxml_get_errors();
    if (count($errors) > 0) {
        printf("Errors detected while processing %s:\n", $outputFile);
        foreach ($errors as $error) {
            printf("  %s\n", $error->message);
        }
        libxml_clear_errors();
    } else {
        $output = preg_replace(
            ['/^\s+/m', '/\n/'],
            '',
            file_get_contents(preg_replace('/\.html$/', '.xml', $layoutFileHtml)) . file_get_contents('template.xml')
        ) . $output;
    }
    printf("Wrote %d bytes to %s\n", file_put_contents($outputFile, $output), $outputFile);
}
