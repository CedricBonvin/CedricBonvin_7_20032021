const express = require('express');
const router = express.Router();
const multer = require("../middleware/multerConfig")
const auth = require("../middleware/auth")

const messageCtlr = require('../controllers/message');

router.get('/message', messageCtlr.displayMessages); // !!!!!!!! JE NE PEUT PAS ENVOYER DE HEADER AVEC LE TOKEN !!!!!
router.post('/message',auth, multer, messageCtlr.postMessage); // auth ok
router.post('/message/update', auth, messageCtlr.upDateMessage); // auth ok
router.post('/message/delete',auth, messageCtlr.deleteMessage); // auth ok 
router.post('/message/like',auth, messageCtlr.like, messageCtlr.displayMessages); // auth ok
router.post('/message/dislike',auth, messageCtlr.dislike, messageCtlr.displayMessages); // auth ok
router.post('/message/commentaire',auth,messageCtlr.findMessage); // auth ok
router.post('/commentaires',auth,messageCtlr.createCommantaire); // auth ok
router.post('/commentaires/recup',messageCtlr.recupCommentaires); // auth ok

module.exports = router
