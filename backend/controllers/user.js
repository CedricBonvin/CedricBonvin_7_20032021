
const db = require("../sqlConfig");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const User = require("../models/userSQL");

exports.signUp = (req,res) => {
    let isAdmin = false
    if (req.body.pseudo === "admin" && req.body.password === "admin"){
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
                'RANDOM_TOKEN_SECRET',
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

    //.then( result  => res.status(200).json( result))
    .then( result  =>{
        return res.status(200).json({
            idUser: result[0].idUser,
            email: result[0].email,
            pseudo: result[0].pseudo,
            photo: result[0].photo,
            isAdmin : result[0].isAdmin,
            token: jwt.sign(
                { idUser: result[0].idUser},
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
            )
        })
    }) 
    .catch(() => res.status(400).json( { message : "problème que je pige pas...!"} ))  
}

exports.deleteUser = ( req, res) => {
    User.deleteAccount(req.body.email)
    .then(() => res.status(200).json({ message : "l'utilisateur à bien été supprimer...!"}))
    .catch(() => res.status(400).json({ message : "impossible de supprimer l'utilisateur"}))
}

exports.updateUser = (req, res) => {
    console.log("le MP est :"+ req.body.password)
    let image = ""
    if (req.file){
         image =`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }else if (!req.file){
        image = req.body.oldPhotoUser
    }


    User.update(req.body.oldMail, req.body.email, req.body.pseudo, image, req.body.password)
    .then( () =>
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
    )
    .catch( err => res.status(400).json({ err : err.message}))
}

exports.refresh = (req, res) => {
    const token = jwt.verify(req.body.token, 'RANDOM_TOKEN_SECRET');
    const userId = token.idUser
    console.log("le token recu de malade est : " + userId)
    const sql = `SELECT * FROM users WHERE idUser = "${userId}"`

    db.query(sql,(err, succ) => {
        if (err) throw err  
        res.status(200).json( succ )
    })

}

