const express = require("express");
const router = express.Router();
const multer = require("../middleware/multerConfig")

const auth = require("../middleware/auth")
const testSignUp = require("../middleware/testSignUp")

const userCtrl = require("../controllers/user");

router.post("/user", multer, testSignUp, userCtrl.signUp)
router.post("/user/login", userCtrl.login)
router.post("/user/deleteUser",auth, userCtrl.deleteUser)
router.post("/user/update",auth, multer, userCtrl.updateUser)
router.post("/user/refresh",auth, multer, userCtrl.refresh)

module.exports = router