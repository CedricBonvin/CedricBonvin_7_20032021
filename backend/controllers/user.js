// const db = require("../sqlConfig");

// exports.signUp = (req,res) => {
//     res.status(201).json({ message : " ma route inscription fonctionne de malade...!"})
  
// }


const db = require("../sqlConfig");
const bcrypt = require("bcrypt")
const User = require("../models/userSQL");

exports.signUp = (req,res) => {

    bcrypt.hash(req.body.password,10)
    .then(hash => {

        const obj = {
             idUser : req.body.idUser,
             email :req.body.email,
             password : hash,
            //  prenom : req.body.prenom,
            //  message : req.body.message
        }
    
        //let message = new message(obj);         Aurélien avait mis cette ligne mais ca n'est pas déclarer !!!
        User.create(obj, (err,succ) => {
            if(err){
                throw err
            }
            console.log("ok pour l'incrémentation  du nouvel  user avec l'email :" + req.body.email)
            res.status(201).json({ message : "tout est ok pour le nouveau user!" })
        })
    })
    .catch(() => res.status(500).json( { message : "impossible d'enregisté l'utilisateur...!"}) )
}


exports.login = ( req, res) => {
     const email = req.body.email
     const sql = `SELECT * FROM users WHERE email = "${email}" `

    db.query(sql,(err,succ) =>{
        if(err)
        {throw err}
        console.log("l'utilisateur est : " + succ[0].email)
        res.status(200).json(succ)
    })

    
    // bcrypt.compare( req.body.password, User.password)
    // .then( valid =>{
    //     if(!valid){
    //         return res.status(400).json({ message : "le mot de passe n'est pas correct" })
    //     }
    // })
}