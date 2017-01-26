const webpack = require('webpack');

module.exports = {
	entry: './src/components/app.js',
	output: {
		path: './dist/public',
		filename: 'app.bundle.js',
	},
	devtool: 'source-map',
	module: {
		loaders: [
			{
				test: /\.js$|\.jsx/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					presets: [
						'es2015',
						'react',
					],
				},
			},
			{
				test: /\.scss/,
				loader: 'style-loader!css-loader!postcss-loader!sass-loader?outputStyle=expanded',
			}
		],
	},
};
