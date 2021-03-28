

const mysql = require('mysql');

const db = mysql.createConnection({
    host     : "127.0.0.1",
    user     : "root",
    password : "root",
    database : 'groupomania'
});
db.connect((err) => {
    if (err) {
       console.log("IMPOSSIBLE DE SE CONNECTER...!")
    }
    else
    {
        console.log('Connecté a mysql avec l \'id '  + db.threadId);   
    }
});
 //let mess = 'CREATE TABLE message (idMESSAGES int ,`idUSERS` int NOT NULL, message text NOT NULL)';
    //    db.query(mess, (err, res) => {
    //      if (err) throw err
    //      else
    //      console.log('la  table message a été crée !')
    //    });

    //    db.query("INSERT INTO message VALUE (3,34,'BONVIN','CEDRIC','voici mon premier message' )", (err,res) =>{
    //     if (err) throw err
    //     else
    //     console.log('les message à bien été mis a jour... !')
    //    })
module.exports = db;
