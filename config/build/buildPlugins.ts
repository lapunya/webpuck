import { Configuration, DefinePlugin } from "webpack";
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildOptions } from "./types/types";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import path from "path";

export function buildPlugins(options: BuildOptions): Configuration['plugins'] {
    const {mode, paths, platform, analyzer} = options;
    const isProd = mode === 'production';
    const isDev = mode === 'development';

    const plugins:Configuration['plugins'] = [
        // если не указать шаблон, то плагин создаст дефолтный html файл
        // поэтому прописываем template и указываем путь к нашему шаблону
        new HtmlWebpackPlugin({
            template: paths.html,
            // параметр в который прописывается путь до фав иконки 
            favicon: path.resolve(paths.public, 'favicon.ico')
        }),
        // подменяет глобальные переменные в коде на другие значения, например, которые задаем на этапе сборки
        new DefinePlugin({
            // переменной ENV__PLATFORM задаем значение options.platform
            ENV__PLATFORM: JSON.stringify(platform)
        })
    ];

    if(isDev) {
        plugins.push(
            new ForkTsCheckerWebpackPlugin(),
            new ReactRefreshWebpackPlugin()
        )
    }

    if(isProd) {
        // плагин для размещенния стилей в файлы css. подходит для dev режима
        // можно задать шаблоны для имен
        plugins.push(
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].[contenthash:8].css'
            }),
            // CopyPlugin копирует нужные файлы из исходника в финальную папку
            new CopyPlugin({
                patterns: [
                  {
                    from: path.resolve(paths.public, 'locales'), 
                    to: path.resolve(paths.output, 'locales')
                }
                ],
            })
        )
    }

    if(analyzer) {
        plugins.push(new BundleAnalyzerPlugin({
            openAnalyzer: false
        }))
    }

    return plugins;
}