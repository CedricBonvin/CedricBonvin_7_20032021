const db = require("../sqlConfig");
const Message = require("../models/messageSQL");

exports.deleteCommentaire = (req, res ) => {

    const sql = `DELETE FROM commentaires WHERE idcommentaire = ${req.body.idCommentaire}`
    db.query(sql, (err, succ) => {
        if (err) throw err
        res.status(200).json({ Message : "le commentaire est supprimé avec l'id : " + req.body.idCommentaire})
    })     
}

exports.createCommantaire = (req, res) => {

    let image = null
    if (req.file){
        image =  `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }

    const sql = `INSERT INTO commentaires (idUser, idMessageBase, message, image, pseudo, date)
                 VALUES ("${req.body.idUser}", "${req.body.idMessageBase}", "${req.body.message}","${image}", "${req.body.pseudo}", "${req.body.date}")`
    db.query(sql, (err, succ) => {
        if (err) throw err
        res.status(200).json({message : "le commentaire à bien été ajouter ...!"})
    })
}

// exports.recupCommentaires = (req, res) => {
//     //selecion du message de base pour trouver l'idUser
//     db.query(`SELECT * FROM commentaires WHERE idMessageBase = ${req.body.idMessageBase}`,(err,succ) => {
//         if (err) throw err
//         const idUser = succ[0].idUser

//         //const sql = `SELECT * FROM commentaires WHERE idMessageBase = ${req.body.idMessageBase}`
//         const sql = `SELECT * FROM commentaires c INNER JOIN users WHERE users.idUser = ${idUser} AND c.idMessageBase = ${req.body.idMessageBase}`
//         db.query(sql, (err, succ1) => {
//             if (err) throw err
//             res.status(200).json(succ1)
//         })
//     })
// } 
exports.recupCommentaires = (req, res) => {
       // const sql = `SELECT * FROM commentaires WHERE idMessageBase = ${req.body.idMessageBase}`
        const sql = `SELECT * FROM commentaires c INNER JOIN users WHERE users.idUser = c.idUser AND c.idMessageBase = ${req.body.idMessageBase}`
        db.query(sql, (err, succ1) => {
            if (err) throw err
            res.status(200).json(succ1)
        })
} 




exports.findMessage = (req, res, ) => {

    const sql = `SELECT * FROM message m INNER JOIN users WHERE users.idUser = m.idUSERS AND m.idMESSAGES = ${req.body.idMessage}`

        db.query(sql,(err , succ) => {
            if (err) throw err
            res.status(200).json(succ)
        })
    }

exports.update = (req, res ) => {
    const sql = `UPDATE commentaires SET message = "${req.body.commentaire}" WHERE idCommentaire = ${req.body.idCommentaire}`
    db.query(sql, (err, succ) => {
        if (err) throw err
        res.status(201).json( { message : "route update Ok ! "})
    })
}

