const db = require("../sqlConfig");
const Message = require("../models/messageSQL");


// avec promise
exports.displayMessages = (req,res) => {
    Message.findAll() 
    .then(result => res.status(200).json(result))
    .catch(()=> res.status(400).json({ message : "Impossible de renvoyer les données demandé " }))
 }

exports.postMessage = (req,res) => {
    console.log(req.body.message)
    let obj = {}
    if (req.file){
         obj = {
            ...req.body,   
            image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }
    }else
     obj = {
        ...req.body, 
        image : null  
    }
    let message = new Message(obj);        
    Message.create(message, (err,succ) => {
        if(err){
            throw err
        }
        res.status(201).json(message)
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

exports.like = (req,res, next) => {
    let userExiste = false

    // RECHECHE SQL 
    const alreadyExiste = `SELECT * FROM likes WHERE idMessage = ${req.body.idMessage} AND idUser = ${req.body.idUser}`
    const insertLike = `INSERT INTO likes (idMessage, idUser) VALUES("${req.body.idMessage}", ${req.body.idUser})` 
    const deleteLike = `DELETE FROM likes WHERE idUser = ${req.body.idUser} AND idMessage = ${req.body.idMessage}`
    const verifDislike = `SELECT * FROM dislikes WHERE idMessage = ${req.body.idMessage} AND idUser = ${req.body.idUser}`
    const deleteDisLike = `DELETE FROM dislikes WHERE idUser = ${req.body.idUser} AND idMessage = ${req.body.idMessage}`

    // VERIFIE DANS DISLIKE SI USER EXISTE
     db.query(verifDislike,(err, succ) => {
        if (succ.length > 0){
            db.query(deleteDisLike,(err,succ) => {
                if (err) throw err
            })
            // -1 totalDislike
            db.query(`SELECT totalDislike FROM message WHERE idMESSAGES = ${req.body.idMessage}`, (err, succ) => {
                if (err) {throw err}
                const total = succ[0].totalDislike - 1
                 db.query(`UPDATE message SET totalDislike = ${total} WHERE idMESSAGES = ${req.body.idMessage}`,(err,succ)=> {
                     if (err) throw err
                 })      
            })
        }
    })
    db.query(alreadyExiste, (err, succ) => {
  
        if (err) throw err
        succ.length > 0  ? userExiste = true :userExiste = false
        // SI LE USER N'EXISTE PAS
        if (userExiste === false){
            console.log("user existe pas")
            // insert du message dans la table like
            db.query(insertLike,(error ,succes) => {
                if (error) throw error 
            })
            // +1 à totalLike
            db.query(`SELECT totalLike FROM message WHERE idMESSAGES = ${req.body.idMessage}`, (err, succ) => {
                if (err) {throw err}
                const total = succ[0].totalLike + 1
                 db.query(`UPDATE message SET totalLike = ${total} WHERE idMESSAGES = ${req.body.idMessage}`,(err,succ)=> {
                     if (err) throw err
                 })      
            })
        } 
        // SI LE USER EXISTE
        if(userExiste === true){
            console.log("user existe")
            db.query(deleteLike, (err,succ) => {
                if (err) throw err
            })
            // -1 à totalLike
            db.query(`SELECT totalLike FROM message WHERE idMESSAGES = ${req.body.idMessage}`,(err, succ) => {
                if (err) {throw err}
                const total = succ[0].totalLike - 1
                 db.query(`UPDATE message SET totalLike = ${total} WHERE idMESSAGES = ${req.body.idMessage}`,(err,succ)=> {
                     if (err) throw err
                 })      
            })
        }
    })
    Message.findAll() 
    .then(result => res.status(200).json(result))
    .catch(()=> res.status(400).json({ message : "Impossible de renvoyer les données demandé " }))
    
    next()  
}

exports.dislike = (req,res,next) => {
    
    let userExiste = false

    // RECHECHE SQL 
    const alreadyExiste = `SELECT * FROM dislikes WHERE idMessage = ${req.body.idMessage} AND idUser = ${req.body.idUser}`
    const insertdislike = `INSERT INTO dislikes (idMessage, idUser) VALUES("${req.body.idMessage}", ${req.body.idUser})` 
    const deleteDislike = `DELETE FROM dislikes WHERE idUser = ${req.body.idUser} AND idMessage = ${req.body.idMessage}`
    const verifLike = `SELECT * FROM likes WHERE idMessage = ${req.body.idMessage} AND idUser = ${req.body.idUser}`
    const deleteLike = `DELETE FROM likes WHERE idUser = ${req.body.idUser} AND idMessage = ${req.body.idMessage}`

    // VERIFIE DANS LIKES SI USER EXISTE
    db.query(verifLike,(err, succ) => {
        //si il existe dans les likes
        if (succ.length > 0){
            db.query(deleteLike,(err,succ) => {
                if (err) throw err
            })
            // -1 à totalLike
            db.query(`SELECT totalLike FROM message WHERE idMESSAGES = ${req.body.idMessage}`, (err, succ) => {
                if (err) {throw err}
                const total = succ[0].totalLike - 1
                 db.query(`UPDATE message SET totalLike = ${total} WHERE idMESSAGES = ${req.body.idMessage}`,(err,succ)=> {
                     if (err) throw err
                 })      
            })
        }       
    })
    db.query(alreadyExiste, (err, succ) => {
        if (err) throw err
        
        succ.length > 0 ? userExiste = true :userExiste = false
        // SI LE USER N'EXISTE PAS
        if (userExiste === false){
            db.query(insertdislike,(error ,succes) => {
                if (error) throw error       
            })
            // +1 à totalDisike
            db.query(`SELECT totalDislike FROM message WHERE idMESSAGES = ${req.body.idMessage}`, (err, succ) => {
                if (err) {throw err}
                const total = succ[0].totalDislike + 1
                 db.query(`UPDATE message SET totalDislike = ${total} WHERE idMESSAGES = ${req.body.idMessage}`,(err,succ)=> {
                     if (err) throw err
                 })      
            })         
        } 
        // SI LE USER EXISTE
        if(userExiste === true){
            db.query(deleteDislike, (err,succ) => {
                if (err) throw err
            })
            // -1 à totalDisike
            db.query(`SELECT totalDislike FROM message WHERE idMESSAGES = ${req.body.idMessage}`, (err, succ) => {
                if (err) {throw err}
                const total = succ[0].totalDislike - 1
                 db.query(`UPDATE message SET totalDislike = ${total} WHERE idMESSAGES = ${req.body.idMessage}`,(err,succ)=> {
                     if (err) throw err
                 })      
            })      
        }
    })
     Message.findAll() 
     .then(result => res.status(200).json(result))
      .catch(()=> res.status(400).json({ message : "Impossible de renvoyer les données demandé " }))
    next()
    
}