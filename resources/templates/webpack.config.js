const path = require('path');

const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const entryFiles = [
    ...glob.sync('./src/Views/**/*.module.js'),
    ...glob.sync('./src/Views/**/*.module.ts'),
    ...glob.sync('./src/JavaScript/*.js'),
    ...glob.sync('./src/TypeScript/*.ts')
];

const WebpackDefault = {
    entry: entryFiles.reduce((obj, el) => {
        // eslint-disable-next-line no-param-reassign
        obj[path.parse(el).name] = el;

        return obj;
    }, {}),
    // devtool: 'inline-source-map',
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: false
                        }
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    require('postcss-import'),
                                    require('tailwindcss/nesting'),
                                    require('tailwindcss'),
                                    require('autoprefixer')
                                ]
                            }
                        }
                    }
                ]
            }

        ]
    }
};

module.exports = WebpackDefault;
