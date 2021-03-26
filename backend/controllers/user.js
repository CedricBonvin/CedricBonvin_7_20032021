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
            ...req.body,
             password : hash,
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


// exports.login = ( req, res) => {
//      const email = req.body.email
//      const sql = `SELECT * FROM users WHERE email = "${email}" `
//      console.log("le mail envoyé depuis le login est :" + email)

//     db.query(sql,(err,succ) =>{
//         if(err)
//         console.log("utilisateur non trouvé...!")
//         if (succ.length != 0)
//         {
//             console.log("l'utilisateur a été touver dans la base : " )
//             res.status(200).json(succ)
//         }
//         else {
//             console.log("l'utilisteur n'existe pas dans la base")
//         }
//     })   
// }

exports.login = ( req, res) => {
    const email = req.body.email
    const password = req.body.password

    User.findOne(email,password)
    .then( result  => res.status(200).json( result))
    .catch(() => res.status(400).json( { message : "problème que je pige pas...!"} ))  
}

