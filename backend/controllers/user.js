


const db = require("../sqlConfig");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const User = require("../models/userSQL");

exports.signUp = (req,res) => {
    console.log(req.body)
    bcrypt.hash(req.body.password,10)
    .then(hash => {

        const obj = {
            ...req.body,
             password : hash,
             photo: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

        }
    
        let newUser = new User(obj);        
        User.create(newUser, (err,succes) => {
            if(err){
                throw err
            }
            console.log("ok pour l'incrémentation  du nouvel  user avec l'email :" + req.body.email)
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
        console.log("le resultat de la promesse de findOne est : "+result)
       return res.status(200).json({
        
        idUser: result[0].idUser,
        email: result[0].email,
        pseudo: result[0].pseudo,
        photo: result[0].photo,
        token: jwt.sign(
          { idUser: result[0].idUser},
          'RANDOM_TOKEN_SECRET',
          { expiresIn: '24h' }
        )
        })
    }) 
    .catch(() => res.status(400).json( { message : "problème que je pige pas...!"} ))  
}

