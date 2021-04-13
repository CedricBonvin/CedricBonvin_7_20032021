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
    const sql = `INSERT INTO commentaires (idUser, idMessageBase, message, image, pseudo, photoProfil, date)
                 VALUES ("${req.body.idUser}", "${req.body.idMessageBase}", "${req.body.message}","null", "${req.body.pseudo}", "${req.body.photoProfil}", "${req.body.date}")`
    db.query(sql, (err, succ) => {
        if (err) throw err
        res.status(200).json({message : "le commentaire à bien été ajouter ...!"})
    })
}

exports.recupCommentaires = (req, res) => {
    const sql = `SELECT * FROM commentaires WHERE idMessageBase = ${req.body.idMessageBase}`
    db.query(sql, (err, succ) => {
        if (err) throw err
        res.status(200).json(succ)
    })
}
exports.findMessage = (req, res, ) => {
    //    const sql = `SELECT idMESSAGES, idUSERS, message, pseudoUser, date, image 
    //    FROM message WHERE idMESSAGES = "${req.body.idMessage}"
    //    UNION
    //    SELECT * FROM users WHERE idUser = "${req.body.idUser}"`
        const sql = `SELECT * FROM message WHERE idMESSAGES = "${req.body.idMessage}"`
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