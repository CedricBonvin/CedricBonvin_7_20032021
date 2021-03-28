const db = require("../sqlConfig");
const Message = require("../models/messageSQL");


// avec promise
exports.displayMessages = (req,res) => {
    Message.findAll() 
    .then(result => res.status(200).json(result))
    .catch(()=> res.status(400).json({ message : "Impossible de renvoyer les données demandé " }))
 }

// exports.postMessage = (req,res) => {

//     const obj = {
//          idMESSAGES : req.body.idMESSAGES,
//          idUSERS :req.body.idUSERS,
//          nom : req.body.nom,
//          prenom : req.body.prenom,
//          message : req.body.message
//     }

//     //let message = new message(obj);         Aurélien avait mis cette ligne mais ca n'est pas déclarer !!!
//     Message.create(obj, (err,succ) => {
//         if(err){
//             throw err
//         }
//         console.log("ok pour le post")
//         res.status(201).json({ message : "tout est ok pour la route POST...!" })
//     })
// }


//avec callback
exports.postMessage = (req,res) => {
    const obj = req.body
    let message = new Message(obj);        
    Message.create(message, (err,succ) => {
        if(err){
            throw err
        }
        console.log("ok pour le post")
        res.status(201).json({ message : "tout est ok pour la route POST...!"})
    })
}


// avec CallBack
exports.upDateMessage = (req,res) => {
    Message.update(req.body.message, req.body.idMESSAGES, () => {
        res.status(202).json({ message : " le message à bien été modifié...!"})
   })
}

// avec promise
exports.deleteMessage = (req,res) => {
    Message.delete(req.body.idMESSAGES)
    .then(()=> res.status(200).json( { message : `Le message à bien été supprimer `}))
    .catch(() => res.status(400).json({ message : "impossible de supprimer le message...!"}))
    
}