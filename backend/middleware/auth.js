const jwt = require('jsonwebtoken');
require("dotenv").config()



module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECURE_TOKEN);
        const userId = decodedToken.idUser;
        if (req.body.idUSERS && req.body.idUSERS !== userId) {
            throw 'Invalid user ID';
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            message : ("le token n'est pas vérifier...")
        });
    }
  };