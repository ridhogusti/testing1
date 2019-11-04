const router = global.express.Router()

router.get('/', (req, res) => {
  res.send({
    success: true,
    message: 'Server on!',
  });
})


module.exports = router
