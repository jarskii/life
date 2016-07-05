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

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const publicPath = `/${DIST_DIRNAME}/`;

const HTML_TEMPLATE_FILENAME = 'index.tmpl';

const config = {
  devtool: `eval`,
entry: {
  app:[
      `react-hot-loader/patch`,
      `webpack-dev-server/client?${PROTOCOL}://${HOST}:${PORT}`,
      `webpack/hot/only-dev-server`,
      `./${SRC_DIRNAME}/${ENTRY_BASENAME}`,
  ],
},
output: {
  path: DIST_PATH,
  filename: `[name].js`,
  chunkFilename: `[name].chunk.js`,
  publicPath,
},
module: {
  loaders: [
    {
      test: /\.js$/,
      loaders: [
        'babel',
        'component-css?ext=styl&cssModules=1'
      ],
      include: [
        SRC_PATH
      ]
    },
    {
      test: /\.styl$/,
      loaders:  [
        'style-loader',
        'css-loader?modules&importLoaders=1&localIdentName=[hash:base64:5]',
        'stylus-loader'
      ]
    },
    {
      test: /\.css$/,
      loader: "style!css"
    }
  ]
},
resolve: {
  modules: [
    'node_modules',
    SRC_PATH,
    COMPONENTS_PATH,
  ],
  alias: {
    components: COMPONENTS_PATH
  }
},
plugins: [
  new webpack.HotModuleReplacementPlugin(),
  new HtmlWebpackPlugin({
    title: `My App`,
    template: `./${SRC_DIRNAME}/${HTML_TEMPLATE_FILENAME}`,
    inject: 'body',
  }),
  new webpack.NoErrorsPlugin(),
  ],
};

new WebpackDevServer(webpack(config), {
  hot: true,
  contentBase: "./src",
  historyApiFallback: {
    index: publicPath,
  },
  publicPath,
  inline: true,
}).listen(PORT, HOST, function (err) {
  if (err) {
    return console.log(err);
  }
  console.log(`Listening at ${PROTOCOL}://${HOST}:${PORT}/`);
});

