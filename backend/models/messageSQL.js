const { response } = require("express");
const db = require("../sqlConfig");

// const Message = (message) => {
//     this.idMESSAGES = message.idMESSAGES ? message.idMESSAGES : null;
//     this.idUSERS = message.idUSERS ? message.idUSERS : null;
//     this.nom = message.nom ? message.nom : null;
//     this.prenom = message.prenom ? message.prenom : null;
//     this.message = message.message ? message.message : null;
// }

function Message (message) { // Pour que ca fonctionne j'ai du mettre une fonction et pas fleché 
    this.idMESSAGES = message.idMESSAGES ? message.idMESSAGES : null;
    this.idUSERS = message.idUSERS ? message.idUSERS : null;
    this.message = message.message ? message.message : null;
    this.pseudoUser = message.pseudoUser ? message.pseudoUser : null;
    this.date = message.date ? message.date : null;
    
    
}

Message.create = (newMessage, callback) => {
    db.query('INSERT INTO message SET ?', newMessage, (err, res) => {
        if (err){
            throw err
        }
        // res.insertId donne le resultat de l'autoIncrementation de l'id
        callback(null, {idMESSAGES: res.insertId, ...newMessage})
    })
}

// Message.find = (callback) => {
//     const sql = `SELECT * FROM message LIMIT 3`
//     db.query(sql, (err,succ) => {
//         if (err) {
//             throw err
//         }  
//         callback (succ) 
//     })
// }
                                                             /// Les 2 methodes fonctionnent, je suis trop content
Message.findAll = () => {
    return new Promise((resolve,reject) =>{
        const sql = `SELECT * FROM message`
        db.query(sql, (err,succ) => {
            if (err) {
                throw err
            }
            resolve (succ)  
        })
    })
}

Message.update = (newMessage,idOldMessage,callback) => {
    const sql = `UPDATE message SET message = "${newMessage}" WHERE idMESSAGES = ${idOldMessage}`
    db.query(sql,(err,succ) => {
        if (err){
            throw err
        }
        callback()
    })
}


Message.delete = (id) => {
    return new Promise ((resolve, reject) => {
        const sql = `DELETE FROM message WHERE idMESSAGES = ${id}`
        db.query(sql,(err,succ) => {
            if(err){
                throw err
            }
            resolve(succ)
        })
    })
}


module.exports =  Message  // Aurélien avait oublié de l'exporter