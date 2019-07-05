const path = require('path');
const os = require('os');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin  = require('uglifyjs-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var AutoDllPlugin = require('autodll-webpack-plugin')
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

/**
 * Webpack 4.*.* 不需要在 plugin 或 loader 指定 source-map
 */

module.exports = (env, argvs) =>{
  return {
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
      historyApiFallback: true,
      allowedHosts: [
        'fea.chatroom.ques98.cn',
        // '127.0.0.1',
        // 'localhost'
      ],
      watchOptions: {
        ignored: ['node_modules', ],
        aggregateTimeout: 300,
        poll: 1500,
      },
    },
    devtool: argvs.mode === 'production' ? 'none' : "source-map",
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
                hmr: argvs.mode === 'development',
              },
            },
            {
              loader: "css-loader",
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
              loader: "sass-loader",
            },
          ]
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 1024,//限制打包图片的大小：
                //如果大于或等于8192Byte，则按照相应的文件名和路径打包图片；如果小于8192Byte，则将图片转成base64格式的字符串。
                name:'images/[name]-[hash:8].[ext]',//images:图片打包的文件夹；
                //[name].[ext]：设定图片按照本来的文件名和扩展名打包，不用进行额外编码
                //[hash:8]：一个项目中如果两个文件夹中的图片重名，打包图片就会被覆盖，加上hash值的前八位作为图片名，可以避免重名。
              }
            }
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
            'socket.io-client',
            'socket.io-file-client',
            'jwt-decode',
            'moment',
            'react',
            'react-dom',
            'react-router-dom',
          ]
        }
      }),
    ],
  
    performance: {
      hints: 'warning',
      maxEntrypointSize: argvs.mode === 'production' ? 2000000 : 6000000,
      maxAssetSize: argvs.mode === 'production' ? 2000000 : 6000000,
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
        new OptimizeCSSAssetsPlugin({
          assetNameRegExp: /\.css$/g,
          cssProcessor: require('cssnano'),
          // cssProcessorOptions: cssnanoOptions,
          cssProcessorPluginOptions: {
            preset: ['default', {
              discardComments: {
                removeAll: true,
              },
              normalizeUnicode: false
            }]
          },
          canPrint: true
        })
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
            priority: -10
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      }
    },
    // externals: {
    //   'react':'react',
    //   'react-dom':"react-dom",
    //   'react-router':'react-dom',
    //   'moment':'moment',
    //   "antd":"antd"
    // }
    
  }
  
}