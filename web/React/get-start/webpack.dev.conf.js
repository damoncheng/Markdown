const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf.js');

devconfig = merge(baseConfig, {
    entry: [
        'react-hot-loader/patch',
        './src/index.js'
    ],
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: false,// 默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录
        historyApiFallback: true,// 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        compress: true,// 启用gzip压缩
        inline: true,// 设置为true，当源文件改变时会自动刷新页面
        hot: true,// 模块热更新，取决于HotModuleReplacementPlugin
        port: 3000,
        proxy: {
            '/api': {
              target: 'http://localhost:9001',
              //pathRewrite: {'^/api' : ''},
              changeOrigin: true
            }
          }
    },
    optimization: {
        nodeEnv: 'development',
    }
});

devconfig.plugins.push(
    // 热更新相关
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
)

module.exports = devconfig;
