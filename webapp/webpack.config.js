var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var PLATFORM = 'ios';
var outputPath = path.resolve(__dirname, '../iOS/Shopter/LuLaRoe Sellers/www');
if(process.env.PLATFORM === 'material') {
  PLATFORM = 'material';
  outputPath = path.resolve(__dirname, '../Android/Shopter/app/src/main/res/www')
}

var views = [
    // Intial Application Views
  'landingPage',                  // Intial App View
  'login',                        // User Login
  'register',                     // User Registration
      // Main Application Views
  'buyerWall',                    // Buyer Wall
  'sellerWall',                   // Seller Wall
      // Seller Exclusives
  'productRegistration'           // Product Registration
];

module.exports = {
  entry: {index: './src/index.js',
          chatIndex: './src/Chat_index.js'
  },
  output: {
    path: outputPath,
    filename: '[name]-bundle.js'
  },
  module: {
    rules: [{
      test: /\.less/,
      use: [ 'style-loader', 'css-loader', 'resolve-url-loader', 'less-loader' ]
    }, {
      test: /\.mustache$/, loader: 'mustache-loader'
    }, {
      test: /\.(gif|png|svg|woff2?|eot|ttf)$/, loader: 'file-loader?'
    }]
  },
  plugins: [
    // new webpack.ProvidePlugin({ jQuery: 'jquery' }),
    new webpack.DefinePlugin({
      PLATFORM: JSON.stringify(PLATFORM)
    }),
    //favicon: './admin/images/icon.ico'
    new HtmlWebpackPlugin({
      template: 'src/template.html', filename: 'index.html', chunks: ['index'], inject: false}),
     new HtmlWebpackPlugin({template: 'src/ios_views/chat.html', chunks: ['chatIndex'], filename:'chat.html', inject: true})
  ].concat(views.map(function(view) {
    if(PLATFORM === 'material') {
      return new HtmlWebpackPlugin({template: 'src/material_views/'+view+'.html', filename: view+'.html', inject: false});
    } else {
      return new HtmlWebpackPlugin({template: 'src/ios_views/'+view+'.html', filename: view+'.html', inject: false});
    }
  }))
};
