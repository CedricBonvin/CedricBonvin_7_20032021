
const express = require('express');
const router = express.Router();
const multer = require("../middleware/multerConfig")
const auth = require("../middleware/auth")

const commentaireCtlr = require('../controllers/commentaire');




router.post('/commentaires/originalCommentaire',auth,commentaireCtlr.findMessage); // auth ok
router.post('/commentaires',auth,commentaireCtlr.createCommantaire); // auth ok
router.post('/commentaires/recup',commentaireCtlr.recupCommentaires); // auth ok
router.post('/commentaires/delete',auth, commentaireCtlr.deleteCommentaire); // auth ok
router.post('/commentaires/update',auth, commentaireCtlr.update); // auth ok


module.exports = router
