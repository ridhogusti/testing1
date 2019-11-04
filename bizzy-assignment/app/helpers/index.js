const fs = require('fs')
const path = require('path')
const currentWorkDir = process.cwd()

const parseName = require('./parseBasename')
const helpers = {}

fs.readdirSync(currentWorkDir + '/app/helpers/').forEach(file => {
	const extname = path.extname(file)
	const basename = path.basename(file, extname)
	if (~file.indexOf('.js') && basename !== 'index') {
		helpers[parseName(basename)] = require(currentWorkDir +
			'/app/helpers/' +
			basename)
	}
})

module.exports = {
	...helpers
}
