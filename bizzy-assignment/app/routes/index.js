const fs = require('fs')
const path = require('path')
const currentWorkDir = process.cwd()

module.exports = app => {
	fs.readdirSync(currentWorkDir + '/app/routes/').forEach(function(file) {
		const extname = path.extname(file)
		const basename = path.basename(file, extname)
		if (~file.indexOf('.js') && basename !== 'index') {
			app.use(
				'/api/v1/' + basename,
				require(currentWorkDir + '/app/routes/' + file)
			)
		}
	})
}
