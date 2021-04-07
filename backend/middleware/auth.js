const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(' ')[1];
//     const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
//     const userId = decodedToken.userId;
//     if (req.body.userId && req.body.userId !== userId) {
//       throw 'Invalid user ID';
//     } else {
//         console.log("le token est ok !!")
//       next();
//     }
//   } catch {
//     res.status(401).json({
//       error: new Error('Invalid request!')
//     });
//   }
// };

module.exports = (req, res, next) => {
    try {
        //const token = req.body.token;                           // j'ai repris le token dupuis le storage
        const token = req.headers.authorization.split(' ')[1];
        console.log("le token du barer est : " + token)
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.idUser;
        if (req.body.idUSERS && req.body.idUSERS !== userId) {
            throw 'Invalid user ID';
        } else {
            console.log("le token est ok !!")
            next();
        }
    } catch {
        res.status(401).json({
            message : ("le token n'est pas vérifier...")
        });
    }
  };