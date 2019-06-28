const path = require('path');
const os = require('os');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin  = require('uglifyjs-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var AutoDllPlugin = require('autodll-webpack-plugin')
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = {
  mode: 'production',
  entry: './src/index.tsx',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, './src/')
    }
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.[hash:8].js'
  },
  target: 'web',
  // target: 'node', webpack 支持 backend 打包
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    host: '0.0.0.0',
    port: 3001,
    inline: true,
    hot: true,
    watchOptions: {
      ignored: ['node_modules', ],
      aggregateTimeout: 300,
      poll: 1500,
    },
  },
  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          'awesome-typescript-loader'
        ] // 大小写 问题 会造成 awesome-typecript-loader 报错, */index.tsx */Index.tsx
      },
      { 
        enforce: "pre",
        test: /\.js$/,
        use: [
          "source-map-loader"
        ]
      },
      {
        test: [/\.scss$/, /\.css$/],
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: '../',
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          // "style-loader", // 将 JS 字符串生成为 style 节点, 舍弃 使用 css js 分离
          "css-loader", // 将 CSS 转化成 CommonJS 模块
          "sass-loader" // 将 Sass 编译成 CSS，默认使用 Node Sass
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      minify:{ //压缩HTML文件
        removeComments:true,    //移除HTML中的注释
        collapseWhitespace:true    //删除空白符与换行符
      } 
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'bundle.[contenthash:8].css',
      chunkFilename: '[id].css',
    }),
    new AutoDllPlugin({
      filename: '[name].dll.js',
      entry: {
        vendor: [
          'react',
          'react-dom'
        ]
      }
    }),
  ],

  performance: {
    hints: 'warning',
    maxEntrypointSize: 4000000,
    maxAssetSize: 4000000,
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        parallel: 4,
        uglifyOptions: {
          warnings: false,
          parse: {},
          compress: {     //压缩代码
            dead_code: true,    //移除没被引用的代码
            loops: true //当do、while 、 for循环的判断条件可以确定是，对其进行优化
          },
          mangle: true, // Note `mangle.properties` is `false` by default.
          output: {
            comments: false,
          },
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_fnames: false,
        },
      }),
    ],
  },
  // externals: {
  //   'react':'react',
  //   'react-dom':"react-dom",
  //   'react-router':'react-dom',
  //   'moment':'moment',
  //   "antd":"antd"
  // }
  
}
