var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var os = require('os');
var ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
var WebpackMd5Hash = require('webpack-md5-hash');
var NyanProgressPlugin = require('nyan-progress-webpack-plugin')


//var env = config.build.env
//var env = process.env.NODE_ENV === 'production' ? config.build.prodEnv : config.build.testEnv
const env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : require('../config/prod.env')


var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({sourceMap: config.build.productionSourceMap, extract: true})
  },
  devtool: config.build.productionSourceMap
    ? '#source-map'
    : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].js'),
    chunkFilename: utils.assetsPath('js/[name].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({'process.env': env}),
    /**
     * 提取公共的依赖模块
     */

    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: ({resource}) => (
        resource && resource.indexOf('node_modules') >= 0 && resource.match(/\.js$/)
      )
    }),

    new webpack.optimize.CommonsChunkPlugin({
      async: 'common-in-lazy',
      minChunks: ({ resource } = {}) => (
        resource &&
        resource.includes('node_modules') &&
        /jsencrypt/.test(resource)
      ),
    }),
    //提取所有异步模块中的引用2次或以上的公共组件模块,如果不是异步和异步的模块引用相同的组件，则导致第三方依赖和组件提取失败
    new webpack.optimize.CommonsChunkPlugin({
      async: 'used-twice',
      minChunks: (module, count) => (count >= 2)
    }),
    new webpack.optimize.UglifyJsPlugin({ //压缩
      beautify: false,
      comments: false,
      compress: {
        warnings: false,
        drop_console: true,
        collapse_vars: true,
        reduce_vars: true
      }
    }),

    /* new webpack.optimize.UglifyJsPlugin({ //压缩
         beautify: false,
         comments: false,
         compress: {
           warnings: false,
           drop_console: true,
           collapse_vars: true,
           reduce_vars: true
         }
       }),*/

    // 合并样式文件，添加专属指纹
    new ExtractTextPlugin({filename: utils.assetsPath('css/[name].[contenthash].css')}),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      title: '活动管理平台',
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      //favicon: 'favicon.ico',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),

    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
    //  js与css共用相同chunkhash的解决方案
    new WebpackMd5Hash(),
    new NyanProgressPlugin({
      // 获取进度的时间间隔，默认 180 ms
      debounceInterval: 60,
      nyanCatSays(progress, messages) {
        if (progress === 1) {
          return '构建成功！'
        }
      }
    })
  ]
})

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(new CompressionWebpackPlugin({
    asset: '[path].gz[query]',
    algorithm: 'gzip',
    test: new RegExp('\\.(' + config.build.productionGzipExtensions.join('|') + ')$'),
    threshold: 10240,
    minRatio: 0.8
  }))
}

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
