<?php

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or die('Access denied.');

call_user_func(function () {
    /**
     * Default TypoScript for T3ddFestivalTemplate
     */
    ExtensionManagementUtility::addStaticFile(
        't3dd_sitepackage',
        'Configuration/TypoScript',
        'T3 Dev Day - Festival Template'
    );
});
