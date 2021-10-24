import * as path from 'path';
import * as webpack from 'webpack';
// @ts-ignore
import HtmlWebpackPlugin from 'html-webpack-plugin';
import StatoscopePlugin from '@statoscope/webpack-plugin';

import ModuleLogger from './plugins/moduleLogger';

// @ts-ignore
const config: webpack.Configuration = {
    mode: 'production',
    entry: {
        root: './src/pages/root.tsx',
        root2: './src/pages/root2.tsx',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin(),
        new ModuleLogger({
            path: path.resolve(__dirname, './src'),
            pathToSave: path.resolve(__dirname, './unused'),
        }),
        new StatoscopePlugin({
            saveStatsTo: 'stats.json',
            saveOnlyStats: false,
            open: false,
        }),
    ],
    resolve: {
        fallback: {
            "buffer": require.resolve("buffer"),
            "stream": false,
        },
        alias: {
            'crypto-browserify': path.resolve(__dirname, 'uuid-new'),
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.(tsx|ts)/,
                use: 'ts-loader',
            }
        ],
    },
};

export default config;