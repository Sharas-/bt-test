const path = require('path');

const config = {
    entry:
    {
        controller: './src/bowtieGo/controller.js',
        view: './src/bowtieGo/view.js'
    },
    output:
    {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'static/dist'),
    },
    devServer:
    {
       publicPath: '/dist/',
       contentBase: './static/',
       watchContentBase: true,
       compress: true,
       port: 8000,
       stats: 'minimal'
    },
    module:
    {
        rules:
        [
          {
            test: /view\.(js|jsx)$/,
            use: 'babel-loader',
            include: [path.resolve(__dirname, 'src')]
          }
        ]
  },
  resolve:
   {
      extensions: [ '.js', '.jsx' ],
      alias:
        {
            modules: path.resolve(__dirname, 'src')
        } 
   },
};
module.exports = (env, argv) => {

  if (argv.mode === 'development') {
    config.devtool = 'source-map';
  }

  if (argv.mode === 'production') {
    //...
  }

  return config;
};
