const router = global.express.Router();

const { UserController } = require("../controllers");

router.post("/user", UserController.create);
router.get("/users", UserController.getAll);
router.put("/user/:id", UserController.put);
router.delete("/user/:id", UserController.delete);
router.get("/user/:id", UserController.getOne);

module.exports = router;
