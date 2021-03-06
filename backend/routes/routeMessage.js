const express = require('express');
const router = express.Router();
const multer = require("../middleware/multerConfig")
const auth = require("../middleware/auth")

const messageCtlr = require('../controllers/message');


router.get('/message', messageCtlr.displayMessages); // !!!!!!!! JE NE PEUT PAS ENVOYER DE HEADER AVEC LE TOKEN !!!!!
router.post('/message',auth, multer, messageCtlr.postMessage); // auth ok

router.post('/message/image',auth, multer, messageCtlr.createMessageImage); // auth ok


router.post('/message/update', auth, messageCtlr.upDateMessage); // auth ok
router.post('/message/delete',auth, messageCtlr.deleteMessage); // auth ok 
router.put('/message/like',auth, messageCtlr.like); // auth ok
router.put('/message/dislike',auth, messageCtlr.dislike); // auth ok


module.exports = router
