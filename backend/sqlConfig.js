require("dotenv").config()

const mysql = require('mysql');

const db = mysql.createConnection({
    // host     : "127.0.0.1",
    // user     : "root",
    // password : "root",
    // database : 'groupomania'
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PW,
    database : process.env.DB_DATABASE
    
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
