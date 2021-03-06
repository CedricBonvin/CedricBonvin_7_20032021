
const db = require("../sqlConfig");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const User = require("../models/userSQL");
require("dotenv").config()


exports.signUp = (req,res) => {
    let isAdmin = false
    if (req.body.pseudo === process.env.SECURE_ADMIN && req.body.password === process.env.SECURE_ADMIN){
        isAdmin = 1
    }
    
    bcrypt.hash(req.body.password,10)
    .then(hash => {
        let obj = {}
        if (req.file){
            obj = {
                ...req.body,
                password : hash,
                isAdmin : isAdmin,
                photo: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,                
            } 
        }
        else if (!req.file){
            obj = {
                ...req.body,
                password : hash,
                isAdmin : isAdmin,
                photo : `${req.protocol}://${req.get('host')}/images/profil/profil.png`,
            }
        }
    
        let newUser = new User(obj); 
        User.create(newUser, (err,succes) => {
            newUser.token = jwt.sign(
                { idUser: newUser.idUser},
                process.env.SECURE_TOKEN,
                { expiresIn: '24h' }
            )
            if(err){
                throw err
            }
            res.status(201).json(newUser)
          
        })
    })
    .catch(() => res.status(500).json( { message : "impossible d'enregisté l'utilisateur...!"}) )
}


exports.login = ( req, res) => {
    const email = req.body.email
    const password = req.body.password

    User.findOne(email,password)

    .then( result  =>{
        let valid = true
        let erreur = {
            email : "",
            password : ""
        }
        // test de l'email 
        if (result === 0 ){
            valid = false
            erreur.email = "Votre email ne semble pas être correct !"
        }
        if (result === 1 ){
            valid = false
            erreur.password = "Password incorrect !"
        }
        if (valid === true){
            return res.status(200).json({
                idUser: result[0].idUser,
                email: result[0].email,
                pseudo: result[0].pseudo,
                photo: result[0].photo,
                isAdmin : result[0].isAdmin,
                token: jwt.sign(
                    { idUser: result[0].idUser},
                    process.env.SECURE_TOKEN,
                    { expiresIn: '24h' }
                )
            })
        }else if (valid === false){
            res.status(400).json({erreur})
        }
    }) 
    .catch(() => res.status(400).json( { message : "problème que je pige pas...!"} ))  
}

exports.deleteUser = ( req, res) => {
    User.deleteAccount(req.body.email)
    .then(() => res.status(200).json({ message : "l'utilisateur à bien été supprimer...!"}))
    .catch(() => res.status(400).json({ message : "impossible de supprimer l'utilisateur"}))
}

exports.updateUser = (req, res) => {
    let image = ""
    if (req.file){
         image =`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }else if (!req.file){
        image = req.body.oldPhotoUser
    }
    User.update(req.body.oldMail, req.body.email, req.body.pseudo, image, req.body.password, req.body.confirmPassword)
    .then( response =>{
        let valid = true
       
        if (response.erreur){
            valid = false
        }
        
        if (valid === true) {
            // envoie au front du user
            db.query(`SELECT * FROM users WHERE email = "${req.body.email}"`,(err , succ) => {
                if (err) {
                    throw err
                }
                res.status(200).json( succ[0] )
            }),
            // je met à jour le pseudo dans la table message pour l'affichage des messages avec le nouveau pseudo
            db.query(`UPDATE message SET pseudoUser = "${req.body.pseudo}" WHERE pseudoUser = "${req.body.oldPseudo}"`,(err,succ) =>{
                if(err)
                throw err
            })
        }else {
            res.status(400).json(response)
        }
    })
    .catch( err => res.status(400).json({ err : err.message}))
}

exports.refresh = (req, res) => {
    const token = jwt.verify(req.body.token, process.env.SECURE_TOKEN);
    const userId = token.idUser
    console.log("le token recu de malade est : " + userId)
    const sql = `SELECT * FROM users WHERE idUser = "${userId}"`

    db.query(sql,(err, succ) => {
        if (err) throw err  
        res.status(200).json( succ )
    })

}

