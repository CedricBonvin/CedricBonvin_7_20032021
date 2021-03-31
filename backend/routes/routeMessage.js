const express = require('express');
const router = express.Router();
const multer = require("../middleware/multerConfig")

const messageCtlr = require('../controllers/message');

router.get('/message', messageCtlr.displayMessages);
router.post('/message', multer, messageCtlr.postMessage);
router.post('/message/update', messageCtlr.upDateMessage);
router.post('/message/delete', messageCtlr.deleteMessage);

module.exports = router
