
//modules necessaires:
const mongoose = require ('mongoose');

//déclaration du model via le module mongoose
const PhotosModel = mongoose.model(
    "magasin",
    {
        name: {
            type: String,
            require: true
        },
        description:{
            type: String,
            require: true
        },
        imageURL:{
           type: String,
           require: true
        }
    },
    "photos"
)

//exportation du model:
module.exports = {PhotosModel}