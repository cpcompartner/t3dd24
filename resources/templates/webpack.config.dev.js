const path = require('path');

const CopyPlugin = require('copy-webpack-plugin');
const HandlebarsPlugin = require('handlebars-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');

const baseConfig = require('./webpack.config');

const buildpath = {
    main: path.resolve(__dirname, 'public'),
    js: path.resolve(__dirname, 'public/JavaScript'),
    css: path.resolve(__dirname, 'public/Css'),
    fonts: path.resolve(__dirname, 'public/assets/Fonts'),
    data: path.resolve(__dirname, 'public/Data/'),
    images: path.resolve(__dirname, 'public/assets/Images/'),
    videos: path.resolve(__dirname, 'public/assets/Videos/'),
    favicon: path.resolve(__dirname, 'public/assets/Favicon/'),
    hyphenationPattern: path.resolve(__dirname, 'public/assets/HyphenationPatterns')
};

const dirPath = __dirname.replaceAll('\\', '/');

const PublicBuildConfig = {
    output: {
        path: path.resolve(__dirname, './public/JavaScript'),
        filename: '[name].js'
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {from: 'src/robots.txt', to: buildpath.main},
                {from: 'src/assets/Favicon', to: buildpath.favicon},
                {from: 'src/assets/Images', to: buildpath.images},
                // {from: 'src/assets/Videos', to: buildpath.videos},
                {from: 'src/assets/Fonts', to: buildpath.fonts},
                {from: 'src/Data', to: buildpath.data},
                {from: 'node_modules/hyphenopoly/Hyphenopoly.js', to: buildpath.js},
                {from: 'node_modules/hyphenopoly/Hyphenopoly_Loader.js', to: buildpath.js},
                {from: 'node_modules/hyphenopoly/patterns', to: buildpath.hyphenationPattern}
            ]
        }),
        new HandlebarsPlugin({
            entry: path.join(process.cwd(), 'src/Views/Pages', '**', '*.hbs'),
            output: path.join(process.cwd(), 'public', '[path]', '[name].html'),
            data: path.join(__dirname, 'src/Dev-Data/data.json'),
            partials: [
                path.join(process.cwd(), 'src/Views/Components', '**', '*.hbs'),
                path.join(process.cwd(), 'src/Views/Layouts', '**', '*.hbs')
            ],
            getPartialId: (filePath) => filePath.match(`^${dirPath}/src/Views/Components/(.+).hbs`).pop()
        }),
        new RemoveEmptyScriptsPlugin(),
        new MiniCssExtractPlugin({
            filename: '../Css/[name].css'
        })
    ]
};

module.exports = {
    ...PublicBuildConfig,
    ...baseConfig,
    mode: 'development',
    devtool: 'source-map',
    optimization: {
        minimize: false
    },
    devServer: {
        devMiddleware: {
            writeToDisk: true
        },
        open: [ '/' ],
        hot: true,
        client: {
            overlay: true
        }
    }
};
