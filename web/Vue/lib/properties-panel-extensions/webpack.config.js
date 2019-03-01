const path = require('path');

module.exports = {
  entry: './app/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: "development",
  performance: { hints: false },
  module: {

    rules: [
	  { 
		 test: /\.js$/, 
		 use: 'babel-loader',
		 exclude: [/node_modules/, __dirname + "/lib"],
	  },
	  { 
		 test: /\.css$/, 
		 use: [

			 { loader: 'style-loader' },
			 
			 {
				loader: 'css-loader',
				options: {
				  modules: true
				}
			 },

			 { loader: 'sass-loader' }

		 ],
	  },
	  { 
		 test: /\.ts$/, 
		 use: 'ts-loader'
	  },
	  {   
		 test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
		 loader: "file-loader" 
	  },
	  { 
		 test: /\.(bpmn|svg)$/, 
		 use: 'raw-loader'
	  }
    ]
  }

};
