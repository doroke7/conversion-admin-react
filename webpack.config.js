const path = require('path');
const os = require('os');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AutoDllPlugin = require('autodll-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const dotenv = require('dotenv');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

dotenv.config();
/**
 * Webpack 4.*.* 不需要在 plugin 或 loader 指定 source-map
 */

module.exports = (env, argvs) => {
  return {
    mode: 'production',
    entry: {
      // service: './src/entries/service/index.tsx', // 目前 webpack 多入口都会打包在一起
      admin: './src/entries/admin/index.tsx',     // 目前 webpack 多入口都会打包在一起
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      alias: {
        '@': path.resolve(__dirname, './src/'),
      },
    },
    output: {
      path: path.join(__dirname, '/dist'), //webpack打包后，输出文件放到哪里去
      filename: '[name]/bundle.[hash:8].js',
      publicPath: '/',
    },
    target: 'web',
    // target: 'node', webpack 支持 backend 打包
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      publicPath: '/',
      compress: true,
      host: '0.0.0.0',
      port: process.env.WEBPACK_PORT || 3001,
      inline: true,
      hot: true,
      progress: true,
      historyApiFallback: {
        rewrites: [
          { from: /^\/service\/.*/, to: '/service/index.html' },
          { from: /^\/admin\/.*/, to: '/admin/index.html' },
          { from: /.*/, to: '/service/index.html' },
        ],
        verbose: true,
      },
       allowedHosts: [
        'fea.chatroom.landan.com',
        'www.fea.chatroom.landan.com',
        // '127.0.0.1',
        // 'localhost'
      ],
      watchOptions: {
        ignored: ['node_modules'],
        aggregateTimeout: 300,
        poll: 3000,
      },
    },
    devtool: argvs.mode === 'production' ? 'none' : 'source-map',
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.tsx?$/,
          exclude: /node_modules/,
          // include: [ src],
          loader: 'eslint-loader',
          options: {
            emitWarning: true, // 这个配置需要打开，才能在控制台输出warning信息
            emitError: true, // 这个配置需要打开，才能在控制台输出error信息
            fix: true // 是否自动修复，如果是，每次保存时会自动修复可以修复的部分
          }
        },
        {
          test: /\.tsx?$/,
          use: [
            'awesome-typescript-loader', // 'ts-loader'
            // 'eslint-loader' 暂时关闭 eslint 检查
          ], // 大小写 问题 会造成 awesome-typescript-loader 报错, */index.tsx */Index.tsx
        },
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: /node_modules\/(?!(MY-MODULE|ANOTHER-ONE)\/).*/,
          loader: 'source-map-loader',
          query: {
            presets: ['es2015']
          }
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
                hmr: argvs.mode === 'development',
              },
            },
            {
              loader: 'css-loader',
            },
            // {
            //   loader: 'postcss-loader',
            //   options: {
            //     plugins: [
            //       require('postcss-import')(),
            //       require('autoprefixer')({
            //         browsers: ['last 30 versions', "> 2%", "Firefox >= 10", "ie 6-11"]
            //       })
            //     ]
            //   }
            // },
            {
              loader: 'sass-loader',
            },
          ],
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 1024, //限制打包图片的大小：
                //如果大于或等于8192Byte，则按照相应的文件名和路径打包图片；如果小于8192Byte，则将图片转成base64格式的字符串。
                name: 'images/[name]-[hash:8].[ext]', //images:图片打包的文件夹；
                //[name].[ext]：设定图片按照本来的文件名和扩展名打包，不用进行额外编码
                //[hash:8]：一个项目中如果两个文件夹中的图片重名，打包图片就会被覆盖，加上hash值的前八位作为图片名，可以避免重名。
              },
            },
          ],
        },
      ],
    },
    plugins: [
      ...(argvs.mode === 'production' ? [] : [new BundleAnalyzerPlugin({ analyzerPort: 8081 })]),
      new HtmlWebpackPlugin({
        chunks: ['manifest', 'vendor', 'service'],
        template: './public/service.html',
        filename: 'service/index.html',
        favicon: './public/favicon.ico',
        minify: {
          //压缩HTML文件
          removeComments: true, //移除HTML中的注释
          collapseWhitespace: true, //删除空白符与换行符
        },
      }),
      new HtmlWebpackPlugin({
        chunks: ['manifest', 'vendor', 'admin'],
        template: './public/admin.html',
        filename: 'admin/index.html',
        favicon: './public/favicon.ico',
        minify: {
          //压缩HTML文件
          removeComments: true, //移除HTML中的注释
          collapseWhitespace: true, //删除空白符与换行符
        },
      }),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name]/bundle.[contenthash:8].css',
        chunkFilename: '[id].css',
      }),
      new AutoDllPlugin({
        filename: '[name].dll.js',
        entry: {
          // 'service': [
          //   'socket.io-client',
          //   'socket.io-file-client',
          //   'jwt-decode',
          //   'axios',
          //   'moment',
          //   'react',
          //   'react-dom',
          //   'react-router-dom',
          //   'redux',
          //   'redux-thunk',
          //   'redux-react-hook',
          //   'antd',
          //   'emoji-mart',
          //   '@material-ui/core', // 把两个 entry 共用的 代码都丢在 dll.js 减少 套件重复打包的问题， 但是 src 内部重复打包还是没有解决
          // ],
          'admin': [
            'socket.io-client',
            'socket.io-file-client',
            'jwt-decode',
            'axios',
            'moment',
            'react',
            'react-dom',
            'react-router-dom',
            'redux',
            'redux-thunk',
            'redux-react-hook',
            'antd',
            '@material-ui/core', // 把两个 entry 共用的 代码都丢在 dll.js 减少 套件重复打包的问题， 但是 src 内部重复打包还是没有解决
          ],
        },
      }),
      new Dotenv({
        path: './.env', // Path to .env file (this is the default)
        safe: false // load .env.example (defaults to "false" which does not use dotenv-safe)
      })
    ],

    performance: {
      hints: 'warning',
      maxEntrypointSize: argvs.mode === 'production' ? 2000000 : 6000000,
      maxAssetSize: argvs.mode === 'production' ? 2000000 : 6000000,
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin(),
        new OptimizeCSSAssetsPlugin({
          assetNameRegExp: /\.css$/g,
          cssProcessor: require('cssnano'),
          // cssProcessorOptions: cssnanoOptions,
          cssProcessorPluginOptions: {
            preset: [
              'default',
              {
                discardComments: {
                  removeAll: true,
                },
                normalizeUnicode: false,
              },
            ],
          },
          canPrint: true,
        }),
      ],
      splitChunks: {
        chunks: 'async',
        minSize: 30000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
    },
    // externals: {
    //   'react':'react',
    //   'react-dom':"react-dom",
    //   'react-router':'react-dom',
    //   'moment':'moment',
    //   "antd":"antd"
    // }
  };
};
