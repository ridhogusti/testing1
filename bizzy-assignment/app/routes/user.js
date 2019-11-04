const router = global.express.Router()

const { UserController } = require('../controllers')


router.post('/sign-up', UserController)


module.exports = router
