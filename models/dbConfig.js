//module necessaires:
const mongoose = require('mongoose');

//connection a la base de donnée mongodb via mongoose:
mongoose.connect(
    "mongodb://localhost:27017/magasin", (err)=> {
        if (!err) console.log('mongodb successfully connected');
        else console.log ('connection error:' + err) 
    }
)