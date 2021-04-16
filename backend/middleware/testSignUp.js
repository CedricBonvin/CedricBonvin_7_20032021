module.exports = (req,res,next) => {

    let valid = true
    // objet de l'erreur
    let erreur = {
        email : true,
        password : true,
        pseudo :true
    }
    // test Mail 
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
   if (!regex.test(req.body.email)){
       erreur.email = false
       valid = false
   }
   //test password   =>  Min 6 caractères 
   const reg = /.{6,}/  
   if (!reg.test(req.body.password)){
       erreur.password = false
       valid = false
   }
   //test pseudo => entre 3 et 6 caractères
   if (req.body.pseudo.length < 3 || req.body.pseudo.length > 15){
       erreur.pseudo = false
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