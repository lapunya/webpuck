import { Configuration } from "webpack";
import { BuildOptions } from "./types/types";

export function buildResolvers(options: BuildOptions): Configuration['resolve'] {
    return {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            // Указываем значок, который используем в качестве алиаса
            // и путь, который данный алиас заменяет
            '@': options.paths.src
        }
    }
}