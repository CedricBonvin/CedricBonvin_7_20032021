const db = require("../sqlConfig");
const bcrypt = require("bcrypt")

//  MODEL                                                   OBLIGATOIRE DE METTRE UN FONCTION POUR LE MODEL ... !!! 
function User(user){
    this.idUser = user.idUser ? user.idUser : null;
    this.email = user.email ? user.email : null;
    this.password = user.password ? user.password : null;
    this.pseudo = user.pseudo ? user.pseudo : null;
    this.photo = user.photo ? user.photo : null;
  }

User.create = (newUser, callback) => {
    console.log(newUser)
    db.query('INSERT INTO users SET ?', newUser, (err, succ) => {
        if (err){
            throw err
        }
        // res.insertId donne le resultat de l'autoIncrementation de l'id
        callback(null, {idUser: succ.insertId, ...newUser})
    })
}

// User.create = (newUser) => {
//     return new Promise ((resolve, reject) => {
//         db.query('INSERT INTO users SET ?', newUser, (err, succ) => {
//             if (err){
//                 throw err
//             }
//             resolve(succ)
//             // res.insertId donne le resultat de l'autoIncrementation de l'id
//             //callback(null, {idUser: succ.insertId, ...newUser})
//         })
//     })
// }

User.findOne = (bodyMail,bodyPassword) => {
    return new Promise ((resolve, reject) => {
        db.query(`SELECT * FROM users WHERE email = "${bodyMail}"`, (err, succ) => {
            if (err){
                throw err
            }  
            if (succ.length > 0) {
                if (bodyMail === succ[0].email){
                    console.log("l'emai à été trouvé !")
                    bcrypt.compare(bodyPassword, succ[0].password)
                    .then(valid => {
                        if (!valid){
                            console.log("Mot de passe non valide ...!")
                            resolve(1)
                            return
                            
                        } else 
                        console.log("Le password est ok : " + succ[0].password);
                        resolve(succ)
                    })
                }       
            } if (succ.length === 0){
                resolve(0)
            }
        })     
    })    
}

module.exports = User  // Aurélien avait oublié de l'exporter