const db = require("../sqlConfig");
const Message = require("../models/messageSQL");

exports.displayMessages = (req,res) => {
    const mess = 'SELECT * FROM message LIMIT 3';
    db.query(mess,(err,succ) => {
        res.status(200).json(succ)
    })
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

exports.postMessage = (req,res) => {
    const obj = req.body
    let message = new Message(obj);         //Aurélien avait mis cette ligne mais ca n'est pas déclarer !!!
    Message.create(message, (err,succ) => {
        if(err){
            throw err
        }
        console.log("ok pour le post")
        res.status(201).json({ message : "tout est ok pour la route POST...!" })
    })
}

exports.upDateMessage = (req,res) => {
    const id = req.body.idMESSAGES
    const message = req.body.message
    const sql = `UPDATE message SET message = "${message}" WHERE idMESSAGES = ${id}`
    db.query(sql,(err,succ) => {
        console.log("J'ai bien recu l'id du message qui est le : " + id + " et le message est ")
    })
    res.status(201).json({ message : "ok pour la route update"})
}

exports.deleteMessage = (req,res) => {
    res.status(201).json({ message : "mar route pour le delete est ok ... !"})
}