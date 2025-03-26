#!/usr/bin/env php
<?php

foreach (glob('layouts/*.html') as $layoutHtml) {
    $layoutXml = preg_replace('/\.html$/', '.xml', $layoutHtml);
    $output =
        preg_replace(['/^\s+/m', '/\n/'], '', file_get_contents($layoutXml) . file_get_contents('template.xml')) .
        file_get_contents('page.html');
    $output = str_replace('<!--LAYOUT-->', file_get_contents($layoutHtml), $output);
    $output = str_replace('/*CSS*/', '<!--CAMPAIGN_USE--><!--/CAMPAIGN_USE-->', $output);
    $blocks = glob('blocks/*.html');
    $output = str_replace(
        array_map(fn(string $file): string => sprintf('<!--%s_BLOCK-->', strtoupper(basename($file, '.html'))), $blocks),
        array_map(fn(string $file): string => file_get_contents($file), $blocks),
        $output
    );
    $outputFile = sprintf(
        '%s/Ork-%s.hde',
        rtrim($argv[1] ?? './dist' ?: './dist', '/'),
        ucfirst(basename($layoutHtml, '.html'))
    );
    printf("Wrote %d bytes to %s\n", file_put_contents($outputFile, $output), $outputFile);
}
