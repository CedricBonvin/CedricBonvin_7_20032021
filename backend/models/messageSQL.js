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
    this.nom = message.nom ? message.nom : null;
    this.prenom = message.prenom ? message.prenom : null;
    this.message = message.message ? message.message : null;
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


module.exports =  Message  // Aurélien avait oublié de l'exporter