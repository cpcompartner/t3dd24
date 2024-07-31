<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die('Access denied.');

/**
 * Add the CType "t3dd_sitepackage"
 */
ExtensionManagementUtility::addTcaSelectItemGroup(
    'tt_content',
    'CType',
    't3dd_sitepackage',
    'T3 Dev Day - Festival',
    'after:special'
);

/**
 * Add the CType "t3dd_sitepackage-container" to diferentiate from the "t3dd_sitepackage"
 */
ExtensionManagementUtility::addTcaSelectItemGroup(
    'tt_content',
    'CType',
    't3dd_sitepackage-container',
    'T3 Dev Day - Container',
    'after:special'
);
