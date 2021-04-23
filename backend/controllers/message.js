const db = require("../sqlConfig");
const Message = require("../models/messageSQL");


// AFFICHER LES MESSAGES
exports.displayMessages = (req,res) => {
    Message.findAll() 
    .then(result => res.status(200).json(result))
    .catch(()=> res.status(400).json({ message : "Impossible de renvoyer les données demandé " }))
 }
// NOUVEAU MESSAGE 
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
    // si message vide renvoie une erreur
    if (req.body.message.length === 0){
        res.status(400).json( {erreur : " !! Le message ne peut pas être vide !! "})
    }
    else {
        Message.create(message, (err,succ) => {
            if(err){
                throw err
            }
            res.status(201).json(message)
        })
    }      
}
// UPDATE MESSAGE
exports.upDateMessage = (req,res) => {
    if (req.body.message.length === 0){
        res.status(400).json({ erreur : " ! le message ne peut pas être vide !"})
    }else{
        Message.update(req.body.message, req.body.idMESSAGES, () => {         
            res.status(202).json({ message : " le message à bien été modifié...!"})
       })
    }
}
// DELETE MESSAGE
exports.deleteMessage = (req,res) => {
    Message.delete(req.body.idMESSAGES)
    .then(()=> res.status(200).json( { message : `Le message à bien été supprimer `}))
    .catch(() => res.status(400).json({ message : "impossible de supprimer le message...!"}))    
}
// LIKE
exports.like = (req,res, next) => {
     // VERIFIE DANS DISLIKE SI USER EXISTE
    function userIsExiste(){
        return new Promise((resolve,reject) => {    
            const verifDislike = `SELECT * FROM dislikes WHERE idMessage = ${req.body.idMessage} AND idUser = ${req.body.idUser}`
            db.query(verifDislike,(err, succ) => {
                // si user existe
                function func(){
                    if (succ.length > 0){
                        //delete dans la table like
                        const deleteDisLike = `DELETE FROM dislikes WHERE idUser = ${req.body.idUser} AND idMessage = ${req.body.idMessage}`
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
                }
                resolve(func())
                reject(erreur => res.status(400).json({ erreur : erreur.message}))
            })
        })
    }
    userIsExiste()
    .then(() => {
        const alreadyExiste = `SELECT * FROM likes WHERE idMessage = ${req.body.idMessage} AND idUser = ${req.body.idUser}`
        db.query(alreadyExiste, (err, succ) => {  
            if (err) throw err
            // SI LE USER N'A PAS LIKER
            if (succ.length === 0){
                function notLike(){
                    return new Promise((resolve,reject) => {
                        function func(){
                            console.log("user existe pas")
                            // insert du message dans la table like
                            const insertLike = `INSERT INTO likes (idMessage, idUser) VALUES("${req.body.idMessage}", ${req.body.idUser})` 
                            db.query(insertLike,(error ,succes) => {
                                if (error) throw error 
                            })
                            // +1 à totalLike dans les messages
                            db.query(`UPDATE message SET totalLike = totalLike +1 WHERE idMESSAGES = ${req.body.idMessage}`,(err,succ)=> {
                                if (err) throw err
                            })                              
                        }
                        resolve(func())
                        reject(erreur => res.status(400).json({ erreur : erreur.message}))
                    })
                }
                notLike()
                .then(() => res.status(201).json({ message : "ok pour le like"}))
                .catch(err => res.status(400).json({err : err.message}))
            } 
            // SI LE USER A DEJA LIKER 
            if(succ.length > 0){

                function  allreadyLike(){
                    return new Promise((resolve,reject) => {
                        function func(){
                            console.log("user existe")
                            const deleteLike = `DELETE FROM likes WHERE idUser = ${req.body.idUser} AND idMessage = ${req.body.idMessage}`
                            db.query(deleteLike, (err,succ) => {
                                if (err) throw err
                            })
                            // -1 à totalLike
                            db.query(`UPDATE message SET totalLike = totalLike -1 WHERE idMESSAGES = ${req.body.idMessage}`,(err,succ)=> {
                                if (err) throw err
                            })                          
                        }
                        resolve( func())
                        reject(erreur => res.status(400).json({ erreur : erreur.message}))
                    })
                }
                allreadyLike()
                .then(  ()  => res.status(201).json({ message : "ok pour le like"}))
                .catch(err => res.status(400).json({err : err.message}))
            }
        })
    })
    .catch(err => res.status(400).json({ err : err.message}))   
}
// DISLIKE
exports.dislike = (req,res,next) => {
        
    // VERIFIE DANS LIKES SI USER EXISTE
    const verifLike = `SELECT * FROM likes WHERE idMessage = ${req.body.idMessage} AND idUser = ${req.body.idUser}`
    db.query(verifLike,(err, succ) => {
        //si il existe dans les likes
        function userIsExiste(){
            return new Promise((resolve, reject) => {
                function func(){
                    if (succ.length > 0){
                        const deleteLike = `DELETE FROM likes WHERE idUser = ${req.body.idUser} AND idMessage = ${req.body.idMessage}`
                        db.query(deleteLike,(err,succ) => {
                            if (err) throw err
                            // -1 à totalLike
                            db.query(`SELECT totalLike FROM message WHERE idMESSAGES = ${req.body.idMessage}`, (err, succ) => {
                                if (err) {throw err}
                                const total = succ[0].totalLike - 1
                                db.query(`UPDATE message SET totalLike = ${total} WHERE idMESSAGES = ${req.body.idMessage}`,(err,succ)=> {
                                    if (err) throw err
                                })      
                            })
                        })          
                    } 
                }
                resolve(func())
            })
        }
        userIsExiste()
        .then(() => { 
            const alreadyExiste = `SELECT * FROM dislikes WHERE idMessage = ${req.body.idMessage} AND idUser = ${req.body.idUser}`
            db.query(alreadyExiste, (err, succ) => {
                // SI LE USER N'A PAS DEJA DISLIKER
                if (err) throw err         
                if (succ.length === 0){
                    function notDislike(){
                        return new Promise((resolve, reject) => {
                            function func(){
                                // insertion du user dans la table dislikes
                                const insertdislike = `INSERT INTO dislikes (idMessage, idUser) VALUES("${req.body.idMessage}", ${req.body.idUser})` 
                                db.query(insertdislike,(error ,succes) => {
                                    if (error) throw error       
                                })
                                // +1 à totalDisike
                                db.query(`UPDATE message SET totalDislike = totalDislike +1 WHERE idMESSAGES = ${req.body.idMessage}`,(err,succ)=> {
                                    if (err) throw err
                                })
                            }
                            resolve(func())
                            reject(erreur => res.status(400).json({ erreur : erreur.message}))  
                        })
                    }
                    notDislike()
                    .then(() => res.status(200).json({ message : "incrémentation du dislike OK"}))
                    .catch(err => res.status(400).json({ message : " l'incrémentation du like n'est pas résolu !"}))
                } 
                // SI LE USER A DEJA DISLIKER
                if(succ.length > 0){
                    function allreadyDislike(){
                        return new Promise((resolve, reject) => {
                            function func(){
                                //delete du user dans la table dislike
                                const deleteDislike = `DELETE FROM dislikes WHERE idUser = ${req.body.idUser} AND idMessage = ${req.body.idMessage}`
                                db.query(deleteDislike, (err,succ) => {
                                    if (err) throw err
                                })
                                // -1 à totalDisike
                                db.query(`UPDATE message SET totalDislike = totalDislike -1 WHERE idMESSAGES = ${req.body.idMessage}`,(err,succ)=> {
                                    if (err) throw err
                                })     
                            }
                            resolve(func())
                            reject(erreur => res.status(400).json({ erreur : erreur.message})) 
                        })
                    }
                    allreadyDislike()
                    .then(() => res.status(200).json({ message : "remise à zéro des dislikes"}) )
                    .catch( err => res.status(400).json({ message : "La remise à zéro du dislike n'a pas pu être exécuté"}))          
                }
            })   
        })
        .catch(err => res.status(400).json({ err : err.message}))
    })
}
// CREER UN MESSAGE AVEC IMAGE DEPUIS => FRONTEND =>  BOX IMAGE
exports.createMessageImage = (req,res) => {
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
    // si message vide renvoie une erreur
    if (req.body.message.length === 0 && req.file === undefined){
        res.status(400).json( {erreur : " !! Le message doit contenir une photo ou un message !! "})
    }
    else {
        Message.create(message, (err,succ) => {
            if(err){
                throw err
            }
            res.status(201).json(message)
        })
    }      
}



