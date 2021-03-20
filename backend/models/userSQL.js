const db = require("../sqlConfig");

const User = (user) => {
    this.idUser = user.idUser ? user.idUser : null;
    this.email = user.email ? user.email : null;
    this.password = user.password ? user.password : null;
  
    // this.message = message.message ? message.message : null;
}

User.create = (newUser, callback) => {
    db.query('INSERT INTO users SET ?', newUser, (err, res) => {
        if (err){
            throw err
        }
        // res.insertId donne le resultat de l'autoIncrementation de l'id
        callback(null, {idUser: res.insertId, ...newUser})
    })
}

module.exports = User  // Aurélien avait oublié de l'exporter