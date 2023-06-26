module.exports = {
	presets: [
		[
			'@babel/env',
			{
				targets: {
					node: '14.15'
				},
				exclude: ['transform-regenerator']
			}
		],
		'@babel/typescript'
	]
}
