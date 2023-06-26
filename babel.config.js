module.exports = {
	presets: [
		[
			'@babel/env',
			{
				targets: {
					node: '12.20'
				},
				exclude: ['transform-regenerator']
			}
		],
		'@babel/typescript'
	]
}
