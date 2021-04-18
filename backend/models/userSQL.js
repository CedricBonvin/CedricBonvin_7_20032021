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
                    bcrypt.compare(bodyPassword, succ[0].password)
                    .then(valid => {
                        if (!valid){
                            resolve(1)
                            return     
                        } else 
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
User.update = (oldMail,newMail,pseudo,image, newPassword,confirmPassword) => {
    return new Promise((resolve, reject) =>{
        if(newPassword !== undefined || confirmPassword !== undefined){  
            bcrypt.hash(newPassword,10)
            .then(hash => { 
                let valid = true
                let erreur = {
                    email : "",
                    pseudo : "",
                    password : ""
                }
                // test du mail
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                if (!regex.test(newMail)){
                    erreur.email = "Votre email ne semble pas être correct !"
                    valid = false
                }
                // test du nouveau Pseudo
                if (pseudo.length < 3 || pseudo.length > 15){
                    erreur.pseudo = "Entre 3 et 15 caractères"
                    valid = false
                }
                // test password
                if (newPassword.length < 6 ){
                    valid = false
                    erreur.password = "Minimum 6 caractères"
                }
                if(newPassword !== confirmPassword){
                    valid = false
                    erreur.password = "Veuillez rentrer le même mot de passe"
                }

                ///////////
                if (valid === true){
                    let sql = `Update users SET 
                        email = "${newMail}",
                        pseudo = "${pseudo}",
                        photo = "${image}",                    
                        password = "${hash}"
                        WHERE email = "${oldMail}"`
                    db.query(sql,(err,succ) => {
                        if (err){
                            throw err
                        }else resolve(succ)
                    })
                }else if (valid === false) {
                    resolve({erreur})
                }
            })      
        }else {
            let valid = true
                let erreur = {
                    email : "",
                    pseudo : "",
                    password : ""
                }
                // test du mail
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                if (!regex.test(newMail)){
                    erreur.email = "Votre email ne semble pas être correct !"
                    valid = false
                }
                // test du nouveau Pseudo
                if (pseudo.length < 3 || pseudo.length > 15){
                    erreur.pseudo = "Entre 3 et 15 caractères"
                    valid = false
                }
                ///////////
                if(valid === true){
                    let sql = `Update users SET 
                                email = "${newMail}",
                                pseudo = "${pseudo}",
                                photo = "${image}"
                                WHERE email = "${oldMail}"`
                    db.query(sql,(err,succ) => {
                        if (err){
                            throw err
                        }else resolve(succ)
                    })
                }else if (valid === false){
                    resolve({erreur})
                }
        }
    })
}


module.exports = User  // Aurélien avait oublié de l'exporter