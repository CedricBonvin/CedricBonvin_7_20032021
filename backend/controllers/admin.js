const db = require("../sqlConfig");

exports.findAllUsers = (req, res) => {
    const sql = `SELECT * FROM users `
    db.query(sql,(err, succ) => {
        if (err) throw err
        res.status(200).json( succ )
    })
}

exports.deleteUser = (req, res) => {
    const deleteCommentaire = `DELETE FROM commentaires WHERE idUser = ${req.body.idUser}`
    const deleteMessage = `DELETE FROM message WHERE idUSERS = ${req.body.idUser}`
    const sql = `DELETE FROM users WHERE idUser = ${req.body.idUser}`

    db.query(deleteMessage, (err, succ) => {
        if (err) throw err
    })

    db.query(deleteCommentaire, (err, succ) => {
        if (err) throw err
    })

    db.query(sql, (err, succ) => {
        if (err) throw err
        res.status(201).json({ message : "l'utilisateur à bien été supprimé ..."})
    })
}