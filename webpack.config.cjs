// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development', // change to 'production' when deploying
  entry: './src/index.js', // entry point of your app
  output: {
    filename: 'main.js', // bundled output filename
    path: path.resolve(__dirname, 'dist'), // output directory
    clean: true, // clean old files in /dist before new build
  },
    plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // tell it where your HTML lives
    }),
  ],  
  module: {
    rules: [
      {
        test: /\.css$/i, // enable importing CSS files
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devtool: 'source-map', // helpful for debugging in dev mode
};
