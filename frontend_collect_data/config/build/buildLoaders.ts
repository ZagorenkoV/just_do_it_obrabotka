import webpack from 'webpack';
import { buildCssLoader } from './loaders/buildCssLoader';
import { BuildOptions } from './types/config';

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
    const svgLoader = {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    };

    const babelLoader = {
        test: /\.(js|jsx|tsx)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
            },
        },
    };

    const cssLoader = buildCssLoader(isDev);

    // Если не используем тайпскрипт - нужен babel-loader
    const typescriptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    };

    const fontsLoader = {
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        type: 'asset/resource',
        generator: {
            filename: 'assets/fonts/[name][ext]',
        },
    };

    const fileLoader = {
        test: /\.(jpe?g|png|gif|)$/,
        type: 'asset/resource',
        generator: {
            filename: 'app/assets/images/[name][ext]',
        },
    };

    const urlLoader = {
        test: /\.(png|jpg)$/i,
        type: 'asset/resource',
    };

    return [
        urlLoader,
        fileLoader,
        fontsLoader,
        svgLoader,
        babelLoader,
        typescriptLoader,
        cssLoader,
    ];
}
