
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { BuildOptions } from "./types/types";

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
    return {
        port: options.port,
        // Эта опция работает только для дев сервера
        // если раздавать статику через nginx, то понадобится проксирование на index.html
        // TODO: посмотреть ролик про деплой фронтенд приложения
        historyApiFallback: true, // 404 ошибка будет редиректить на index.html
        hot: true // для запуска функционала HMR
    }
}