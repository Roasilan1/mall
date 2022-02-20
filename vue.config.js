const CompressionWebpackPlugin = require('compression-webpack-plugin');
module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                "@/": "./src/",
                "@pages": "./src/pages",
                "@components": "./src/components"
            }
        },
        module: {
            rules: [{
                    test: /\.js/,
                    exclude: /node_modules/,
                }
                /*, {
                                test: /\.(png|jpe?g|gif|svg)/,
                                loader: "url-loader",
                                options: {
                                    limit: 10000
                                }
                            }*/
            ]
        },
        plugins: [
            new CompressionWebpackPlugin({
                //打包文件名
                filename: '[path][base].gz.gz',
                algorithm: 'gzip',
                test: /\\.(js|css)$/,
                //大于 10240字节才进行压缩
                threshold: 10240,
                //压缩率
                minRatio: 0.8
            })
        ]
    },
    lintOnSave: false,
    devServer: {
        proxy: {
            '/api': {
                target: 'http://39.98.123.211/',
                changeOrigin: true
            }
        }
    },

}