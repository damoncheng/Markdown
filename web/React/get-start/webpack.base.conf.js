const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    devtool: 'inline-source-map',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '/dist')
    },
    module: {
        rules: [
            {
                test: /\.json$/,
                use: ['json-loader'],
                exclude: /node_modules/,
            },
            {

                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader",
                
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader : 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders:1,
                        },
                    },
                    {
                        loader : 'sass-loader'
                    }
                ],
            },
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.bpmn$/,
                use: ['raw-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: ['url-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: ['url-loader'],
            },
        ]
    },
    plugins: [
        //new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        //new webpack.HotModuleReplacementPlugin()
    ]
};
