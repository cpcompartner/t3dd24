const fs = require('fs');
const path = require('path');

const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');

/**
 * fontend.json
 */
const FONTS = require('./_FONTS.json');
const PACKAGE = require('./package.json');
const TAILWIND = require('./tailwind.config.js');
const ExtendedBuildConfig = require('./utils/ExtendedBuildConfig');
const baseConfig = require('./webpack.config');

const typo3Package = PACKAGE.system.sitepackage

const stringToWrite = {
    theme: TAILWIND.theme.extend,
    fonts: FONTS,
    devDependencies: PACKAGE.devDependencies,
    dependencies: PACKAGE.dependencies
}

/**
 * Build path
 */
const typo3Public = `../../packages/${typo3Package}/Resources/Public`;
const contentBlocksPath = `../../packages/${typo3Package}/ContentBlocks`;
const typo3Buildpath = {
    main: path.resolve(__dirname, `${typo3Public}`),
    js: path.resolve(__dirname, `${typo3Public}/Javascript`),
    css: path.resolve(__dirname, `${typo3Public}/Css`),
    fonts: path.resolve(__dirname, `${typo3Public}/assets/Fonts`),
    data: path.resolve(__dirname, `${typo3Public}/Data/`),
    images: path.resolve(__dirname, `${typo3Public}/assets/Images/`),
    favicon: path.resolve(__dirname, `${typo3Public}/assets/Favicon/`),
    hyphenationPattern: path.resolve(__dirname, `${typo3Public}/assets/HyphenationPatterns`),
    contentBlocks: path.resolve(__dirname, `${contentBlocksPath}/ContentElements`)
};

const Typo3BuildConfig = {
    output: {
        path: path.resolve(__dirname, `./${typo3Public}/JavaScript`),
        filename: '[name].js'
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {from: 'src/assets/Favicon', to: typo3Buildpath.favicon},
                {from: 'src/assets/Images', to: typo3Buildpath.images},
                {from: 'src/assets/Fonts', to: typo3Buildpath.fonts},
                {from: 'src/Data', to: typo3Buildpath.data},
                {from: 'node_modules/hyphenopoly/Hyphenopoly.js', to: typo3Buildpath.js},
                {from: 'node_modules/hyphenopoly/Hyphenopoly_Loader.js', to: typo3Buildpath.js},
                {from: 'node_modules/hyphenopoly/patterns', to: typo3Buildpath.hyphenationPattern},
                {
                    from: 'src/Views/Components',
                    globOptions: {
                        dot: true,
                        gitignore: true,
                        ignore: [
                            '**/Layouts/**/*',
                            '**/**/Assets/**/*',

                            '**/rounded-stat/*',
                            '**/navigation/*',
                            '**/footer/*'
                        ]
                    },
                    to: typo3Buildpath.contentBlocks
                }
            ]
        }),
        new ExtendedBuildConfig(typo3Buildpath),
        new RemoveEmptyScriptsPlugin(),
        new MiniCssExtractPlugin({
            filename: '../Css/[name].css'
        }),
        new webpack.optimize.ModuleConcatenationPlugin()
    ]
};

/**
 * Write frontend.json
 */
fs.writeFile('./FRONTEND.json', JSON.stringify(stringToWrite), (err) => {
    if (err) {
        console.error(err);

        return;
    }

    console.log('FRONTEND.JSON CREATED!')
});

module.exports = {
    ...Typo3BuildConfig,
    ...baseConfig,
    mode: 'production',
    // devtool: 'source-map',
    optimization: {
        minimize: true
    }
};
