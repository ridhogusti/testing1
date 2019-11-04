const fs = require('fs')
const path = require('path')
const currentWorkDir = process.cwd()

const parseName = require('../helpers/parseBasename')
const controllers = {}

fs.readdirSync(currentWorkDir + '/app/controllers/').forEach(file => {
	const extname = path.extname(file)
	const basename = path.basename(file, extname)
	if (~file.indexOf('.js') && basename !== 'index') {
		controllers[parseName(basename)] = require(currentWorkDir +
			'/app/controllers/' +
			basename)
	}
})

module.exports = {
	...controllers
}
