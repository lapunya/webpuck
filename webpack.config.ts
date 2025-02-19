import webpack from 'webpack';
import path from 'path';
import { BuildMode, BuildPaths, BuildPlatform } from './config/build/types/types';
import { buildWebpack } from './config/build/buildWebpack';
// чтобы передавать переменные окружения их можно прописывать либо в скриптах в package.json, либо при запуске команды
// в терминале, например, npm run start -- --env port=5000
interface EnvVariables {
    mode?: BuildMode;
    port: number;
    analyzer?: boolean;
    platform?: BuildPlatform;
}

export default (env: EnvVariables) => {
    const paths: BuildPaths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'), //склеиваем путь, dirname это текущая папка
        output: path.resolve(__dirname, 'build'), // куда помещается бандл
        html: path.resolve(__dirname, 'public', 'index.html'), //путь к нашему шаблону
        src: path.resolve(__dirname, 'src'), // путь к исходникам, используем для алиаса и удобных импортов
        public: path.resolve(__dirname, 'public')
    }
    const config: webpack.Configuration = buildWebpack({
        port: env?.port ?? 5000,
        mode: env.mode ?? 'development',
        paths,
        analyzer: env.analyzer,
        platform: env.platform ?? 'desktop'
    });
    return config;
        
}