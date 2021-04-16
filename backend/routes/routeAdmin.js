const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth")

const adminCtrl = require('../controllers/admin');




router.get('/admin',adminCtrl.findAllUsers);
router.post('/admin/deleteUser',adminCtrl.deleteUser);



module.exports = router