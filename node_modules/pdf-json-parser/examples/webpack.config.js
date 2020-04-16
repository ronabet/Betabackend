const path = require('path');
module.exports = {
	module: {
		rules: [
			{
				include: [path.resolve(__dirname, 'examples')],
				loader: 'babel-loader',
				options: {
					plugins: ['syntax-dynamic-import'],

					presets: [
						[
							'@babel/preset-env',
							{
								modules: false
							}
						]
					]
				},
				test: /\.js$/
			}
		]
	},
	entry: './examples/index.js',
	output: {
		filename: 'index.js'
	},
	mode: 'development',
};
