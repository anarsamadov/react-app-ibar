const path=require('path');

module.exports={
    entry:'./src/index.js',
    output:{
        path:path.resolve(__dirname,'public'),
        filename:'bundle.js'
    },
    devServer:{
        static: {
            directory: path.join(__dirname, 'public'),
          },
        compress: true,
        port: 9000,
        historyApiFallback:true,
    },
    module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ['@babel/preset-env','@babel/preset-react']
              }
            }
          },
          {
            test: /\.scss$/,
            use:["style-loader","css-loader","sass-loader"],
          }
        ]
      }
}