const fs = require('fs');
const path = require('path');

const HandlebarsPlugin = require('handlebars-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const PACKAGE = require('./package.json');
const RemoveHbsFilesPlugin = require('./utils/CleanupAfterBuild');
const baseConfig = require('./webpack.config');

const typo3Package = PACKAGE.system.sitepackage;

const contentBlocksPath = `../../packages/${typo3Package}/ContentBlocks`;

const typo3Buildpath = {
    contentBlocks: path.resolve(__dirname, `${contentBlocksPath}/ContentElements`)
};

const Typo3BuildConfig = {
    plugins: [
        new HandlebarsPlugin({
            entry: path.join(typo3Buildpath.contentBlocks, '**', '*.hbs'),
            output: fs.existsSync(path.join(typo3Buildpath.contentBlocks, '[path]', 'Source', 'Frontend.html'))
                ? path.join(typo3Buildpath.contentBlocks, '[path]', 'Source', 'Frontend.html')
                : path.join(typo3Buildpath.contentBlocks, '[path]', 'Source', 'Template', '[name].html'),

            data: path.join(__dirname, 'src/Dev-Data/data.json'),
            partials: [
                path.join(typo3Buildpath.contentBlocks, '**', '*.hbs'),
                `!${path.join(typo3Buildpath.contentBlocks, 'Layouts', '**', '*.hbs')}`
            ],
            getPartialId: (filePath) => {
                const match = filePath.match(new RegExp(`^${path.join(typo3Buildpath.contentBlocks)}/(.+).hbs`));

                return match ? match.pop() : null;
            }
        }),
        new MiniCssExtractPlugin({
            filename: '../Css/[name].css'
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new RemoveHbsFilesPlugin(PACKAGE.system.sitepackage)
    ]
};

module.exports = {
    ...Typo3BuildConfig,
    ...baseConfig,
    mode: 'production',
    optimization: {
        minimize: true
    }
};

console.log('Content Block Build Process --- finished!');
