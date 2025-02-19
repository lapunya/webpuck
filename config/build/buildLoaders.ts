import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { ModuleOptions } from "webpack";
import { BuildOptions } from "./types/types";
import loader from "mini-css-extract-plugin/types/loader";
import ReactRefreshTypeScript from "react-refresh-typescript";
import { buildBabelLoader } from "./babel/buildBabelLoader";

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
    const isDev = options.mode === 'development'; 
    const cssLoaderWithModules = {
        loader: 'css-loader',
        options: {
            modules: {
                localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:5]'
            },
            
        }
    }
    const scssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          cssLoaderWithModules,
          // Compiles Sass to CSS
          "sass-loader",
        ],
    }
    const tsLoader = {
        test: /\.tsx?$/, // регулярка с названием тех файлов, которые хотим обрабатывать
        use: [
            {
                loader: 'ts-loader', // название лоадера
                options: {
                    getCustomTransformers: () => ({
                        before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
                      }),
                    // задаем проверять ли типы во время сборки или без проверки компилировать тс код
                    transpileOnly: isDev 
                }
            }
        ],
        exclude: /node_modules/ // то, что мы не обрабатываем
    }

    const assetLoader = {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
    }

    const svgrLoader = {
        test: /\.svg$/,
        use: [{ 
            loader: '@svgr/webpack', 
            options: {
                icon: true, // позволяет работать с svg как с иконками
                svgoConfig: {
                    plugins: [
                        {
                            name: 'convertColors',
                            params: {
                                currentColor: true
                            }
                        }
                    ]
                }
            } 
        }],
    }

    const babelLoader = buildBabelLoader(options);

    return [
        scssLoader,
        // tsLoader,
        babelLoader,
        assetLoader,
        svgrLoader
    ]
}