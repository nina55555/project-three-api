
 //modules necessaires:
 const express = require('express');
 const app = express();
 const mongoose =require('mongoose');
 const cors = require('cors');


 //récupération des fichiers externes necessaire:
 require ("./models/dbConfig");
 const photosControl = require("./controllers/photosController");
 


//middlewares:

 app.use(express.json() );

 app.use(express.urlencoded({extended: false}) );


app.use(express.static('public'))
 
app.use(cors());
app.use('/api', photosControl);
//app.use('/', index)
app.get('/test', function(req, res){
    res.send('Test');
});
 

 //lancement du port:
 //const PORT = process.env.PORT || 5600;
 //app.listen(PORT, () => console.log(`server listening on port ${PORT}`) );

 const PORT = 5800
 app.listen(PORT, () => console.log("Server listening on port ", PORT) );

