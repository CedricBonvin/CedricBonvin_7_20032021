const db = require("../sqlConfig");

module.exports = (req,res,next) => {
 
    let valid = true
    // objet de l'erreur
    let erreur = {
        email : "",
        password : "",
        pseudo : ""
    }

    // Récupération de l'email dans la base
   
       function testMail(){
           return new Promise((resolve, reject) => {
               const sql = `SELECT email FROM  users WHERE email = "${req.body.email}"`     
               db.query(sql,(err, succ) => {
                    if (err) {throw err}
                    else{
                           resolve(succ)
                    }                   
               })
           })
       }
       testMail()
       .then( response => {
           // si l'email existe
           if (response.length > 0){
               valid = false
               erreur.email = "Cette'email est déja existant !"
               res.status(400).json({erreur})
           }
           // si l'email n'existe pas
           else if(response.length === 0){
               // recherche du  pseudo
               const sql1 = `SELECT pseudo FROM  users WHERE pseudo = "${req.body.pseudo}"`     
               db.query(sql1,(err, succ) => {
                   if (err) {throw err}
                   else{
                       // si le pseudo existe déja
                       if (succ.length > 0){
                           erreur.pseudo = "Ce pseudo est déja utilisé"
                           res.status(400).json({erreur})
                       }else {
                        // SI LE PSEUDO EXISTE PAS                      
                            // test Mail
                            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                            if (!regex.test(req.body.email)){
                            erreur.email = "Votre email n'est pas correct !"
                            valid = false
                            }
                            //test password   =>  Min 6 caractères 
                            const reg = /.{6,}/  
                            if (!reg.test(req.body.password)){
                                erreur.password = "Minimum 6 caractères"
                                valid = false
                            }
                            //test pseudo => entre 3 et 6 caractères
                            if (req.body.pseudo.length < 3 || req.body.pseudo.length > 15){
                                erreur.pseudo = "Entre 3 et 15 caractères"
                                valid = false
                            }
                            ////////////
                            if (valid === false){
                                res.status(400).json({erreur})    
                            }
                            else if (valid === true) {
                                next()
                            }
                        }
                    }                   
                })            
            }   
       })
       .catch(err => console.log(err))   
    
 

  
}