

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
module.exports = db;
