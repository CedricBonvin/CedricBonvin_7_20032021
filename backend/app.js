
// application de base 


const express = require('express');
const bodyParser = require('body-parser');
const routeMessage = require("./routes/routeMessage");
const routeUser = require("./routes/routeUser");
const routeCommentaire = require("./routes/routeCommentaire");
const routeAdmin = require("./routes/routeAdmin");
const path = require("path")


    
const app = express();


app.use((req, res, next) => {                              
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json()) // déprécié mais sa fonctionne pas sans

app.use("/images",express.static(path.join(__dirname,"images")))

app.use("/api",routeMessage);
app.use("/api",routeUser);
app.use("/api",routeCommentaire);
app.use("/api",routeAdmin);

module.exports = app;