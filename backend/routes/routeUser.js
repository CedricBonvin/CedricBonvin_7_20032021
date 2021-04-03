const express = require("express");
const router = express.Router();
const multer = require("../middleware/multerConfig")

const userCtrl = require("../controllers/user");

router.post("/user", multer, userCtrl.signUp)
router.post("/user/login", userCtrl.login)
router.post("/user/deleteUser", userCtrl.deleteUser)
router.post("/user/update", multer, userCtrl.updateUser)

module.exports = router