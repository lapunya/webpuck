import webpack from 'webpack';
import path from 'path'; // модуль path из nodejs, чтобы корректно обрабатывать пути на всех ос
import { BuildOptions } from './types/types';
import { buildPlugins } from './buildPlugins';
import { buildLoaders } from './buildLoaders';
import { buildDevServer } from './buildDevServer';
import { buildResolvers } from './buildResolvers';


export function buildWebpack(options: BuildOptions): webpack.Configuration {
    const {mode, paths} = options;
    const isDev = mode === 'development';
    
    return {
    
            // определяет в каком формате происходит сборка разработка/продакшн, берем из переменных окружения
            mode: options.mode ?? 'development', 
    
            // путь до точки входа в приложение
            entry: paths.entry,
            output: {
                path: paths.output,
                // чтобы название бандла не было статичным существуют шаблоны + чтобы не было проблем 
                // с кэшированием в браузере
                filename: '[name].[contenthash].js',
                clean: true // удаляет старые файлы при каждой сборке
            },
            plugins: buildPlugins(options),
            module: {
                // в rules указываем loader'ы - цепочка обработчиков, через которые проходят файлы с тем или иным 
                // расширением. на выходе они компилируются в другие файлы. очень важен порядок loader'ов
                rules: buildLoaders(options)
            },
            resolve: buildResolvers(options),
            devtool: isDev && 'inline-source-map',
            devServer: isDev ? buildDevServer(options) : undefined
        }
}