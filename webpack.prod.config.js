import webpack from 'webpack';
const validate = require('webpack-validator');


import { join } from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const PROTOCOL = 'http';
const HOST = 'localhost';
const PORT = 4567;

const DIST_DIRNAME = 'assets';
const SRC_DIRNAME = 'src';
const ENTRY_BASENAME = 'entry'

const DIST_PATH = join(__dirname, DIST_DIRNAME);
const SRC_PATH = join(__dirname, SRC_DIRNAME);
const COMPONENTS_PATH = join(SRC_PATH, 'components');

var HtmlWebpackPlugin = require('html-webpack-plugin');

const publicPath = `${DIST_DIRNAME}/`;

const HTML_TEMPLATE_FILENAME = 'index.tmpl';

const config = {
  devtool: 'eval',
  entry: {
    app:[
      `./${SRC_DIRNAME}/${ENTRY_BASENAME}`,
    ]
  },
  output: {
    path: DIST_PATH,
    filename: '[name].[hash].js',
    chunkFilename: '[name].chunk.js',
    publicPath: '',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [
          'babel',
          'component-css?ext=styl&cssModules=1'
        ],
        exclude: /node_modules/,
        include: [
          SRC_PATH
        ]
      },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[hash:base64:5]!stylus')
      },
      {
        test: /\.css$/,
        loader:  ExtractTextPlugin.extract('style', 'css')
      }
    ]
  },
  debug: true,
  resolve: {
    //modules: [
    //  'node_modules',
    //  SRC_PATH,
      //COMPONENTS_PATH,
    //],
    alias: {
      components: COMPONENTS_PATH
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Game of life Z',
      template: `./${SRC_DIRNAME}/${HTML_TEMPLATE_FILENAME}`,
      inject: 'body',
    }),
    new ExtractTextPlugin('[name].[hash].css'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        sequences: true,
        dead_code: true,
        drop_debugger: true,
        comparisons: true,
        conditionals: true,
        evaluate: true,
        booleans: true,
        loops: true,
        unused: true,
        hoist_funs: true,
        if_return: true,
        join_vars: true,
        cascade: true,
        drop_console: true
      },
      sourceMap: false,
      output: {
        comments: false,
      },
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.NoErrorsPlugin(),
  ],
}

validate(config)

const bundler = webpack(config);

bundler.compile((err, stats) => {
  console.log(!err ? 'Compile without errors' : '');
  if (err) {
    console.log(err);
    return;
  }
});

bundler.run((err, stats) => {
  console.log(!err ? 'Without errors' : '');
  if (err) {
    console.log(err);
    return;
  }
});