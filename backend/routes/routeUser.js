const express = require("express");
const router = express.Router();
const multer = require("../middleware/multerConfig")

const userCtrl = require("../controllers/user");

router.post("/user", multer, userCtrl.signUp)
router.post("/user/login", userCtrl.login)

module.exports = router