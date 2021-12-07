//modules necessaires:
const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const ObjectId =require('mongoose').Types.ObjectId;

//initialiser multer

const path = require('path');
const multer = require('multer');


//recuperation des fichiers externes necessaires:
const { PhotosModel } = require('../models/photosModel');



//gestion du storage de multer
const storage = multer.diskStorage({
    destination : path.join( __dirname,'../public', 'images' ),
    filename : (req, file, cb) => {
        cb(null, `../${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
})

const upload = multer({
    storage : storage
}).single('images');


//déclaration des fonctions du router methode CRUD:
//pour créer des articles:
router.post('/upload',(req, res) => {
    upload (req, res, err =>{
        if(err){
            res.send(err)
        }else{
            console.log(req.file);
            const newRecord = new PhotosModel({
                name: req.file.fieldname,
                imageURL: req.file.filename
            });
                console.log(newRecord)
            newRecord.save((err, docs) => {
                 if (!err) res.send (docs);
                else console.log ('error creating new data:' +err)
            })
        }
    })
} );



//pour lire les articles:
router.get('/images', (req, res) => {
    PhotosModel.find((err, docs) => {
        console.log(docs)
        if(!err) res.send(docs);
        else console.log ('error:'+ err);
    })
});



//pour modifier des articles:
router.put('/:id', (req,res) =>{
    if(!ObjectId.isValid(req.params.id)
    )
    return res.status(400).send('id non valide'+req.params.id)
    const photoModifiée = {
        name: req.body.name,
        description: req.body.description,
        imageURL: req.body.imageURL
    };
    PhotosModel.findByIdAndUpdate(
        req.params.id,
        {$set: photoModifiée},
        {new: true},
        (err, docs) =>{
            if(!err) res.send(docs);
            else console.log('update error:'+err);
        }
    )
});


//pour effacer un article:
router.delete('/:id', (req,res) => {
    if(!ObjectId.isValid(req.params.id) )
    return res.status(404).send('detete error:' +err)
    PhotosModel.findByIdAndRemove(
        req.params.id, 
        (err, docs) =>{
        if(!err)res.send(docs);
        else console.log('delete error:'+err)
        }
    )
});


    
//exportation du router:
module.exports = router