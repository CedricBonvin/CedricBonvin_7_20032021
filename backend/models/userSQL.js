const db = require("../sqlConfig");
const bcrypt = require("bcrypt")

//  MODEL                                                   OBLIGATOIRE DE METTRE UN FONCTION POUR LE MODEL ... !!! 
function User(user){
    this.idUser = user.idUser ? user.idUser : null;
    this.email = user.email ? user.email : null;
    this.password = user.password ? user.password : null;
    this.pseudo = user.pseudo ? user.pseudo : null;
    this.photo = user.photo ? user.photo : null;
    this.isAdmin = user.isAdmin ? user.isAdmin : false;
}

User.create = (newUser, callback) => {
    console.log(newUser)
    db.query('INSERT INTO users SET ?', newUser, (err, succ) => {
        if (err){
            throw err
        }
        newUser.idUser = succ.insertId // Pour retrouvé l'idUser j'ai du l'incrémenter ici
        // res.insertId donne le resultat de l'autoIncrementation de l'id
        callback(null, {idUser: succ.insertId, ...newUser})
    })
}

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
User.deleteAccount = (bodymail) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM users WHERE email = "${bodymail}"`,(err, succ) => {
            if (err){
                throw err
            }  resolve(succ)
        })
    })
}

// en test 
User.update = (oldMail,newMail,pseudo,image) => {
    return new Promise((resolve, reject) =>{
        const sql = `Update users SET 
                    email = "${newMail}",
                    pseudo = "${pseudo}",
                    photo = "${image}"
                    WHERE email = "${oldMail}"`
        db.query(sql,(err,succ) => {
            if (err){
                throw err
            }else resolve(succ)
        })
    })
}

module.exports = User  // Aurélien avait oublié de l'exporter