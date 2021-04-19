const db = require("../sqlConfig");

module.exports = (req,res,next) => {

   
    let valid = true
    // objet de l'erreur
    let erreur = {
        email : "",
        password : "",
        pseudo : ""
    }

    // test Mail 
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!regex.test(req.body.email)){
       erreur.email = "Votre email ne semble pas être correct !"
       valid = false
    } // test si il existe dans la base de données
    if (regex.test(req.body.email)){
       function testMail(){
           return new Promise((resolve, reject) => {
               const sql = `SELECT email FROM  users WHERE email = "${req.body.email}"`     
               db.query(sql,(err, succ) => {
                   if (err) {throw err}
                   else{
                       if (succ[0] !== undefined){
                           console.log("l'email est : " + succ[0])
                           erreur.email = "L'email existe déja!" 
                           resolve(succ)
                       }
                   }
               })
           })
       }
       testMail()
       .then( response => {
           if (response[0].email.length > 0){
               valid = false
               console.log("on a déja un mail ")
               console.log("l'erreur est : " + erreur.email)
           }   
       })
       .catch(err => console.log(err))
       
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
    ///////////
    if (valid === false){
        res.status(400).json({erreur})    
    }
    else if (valid === true) {
        next()
    }

  
}