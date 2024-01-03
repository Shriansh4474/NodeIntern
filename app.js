const express = require ("express");
require("./db/connection");
const Note = require("./models/notes");


const app = express();
const port = process.env.PORT || 4000 ;

app.use(express.json());

// 1. npm i to install all the dependencies then use nodemon src/app.js
// 2. Use postman and Mongocompass for testing these end points and see the database for all changes


app.post("/notes" , async(req,res) => {
    try{
        const user = new Note(req.body);
        const createnote = await user.save();
        res.status(201).send(createnote);
    }catch(e){ res.status(400).send(e);}
}) 

app.get("/notes" , async(req,res) => {
    try{
        const allnotes = await Note.find();
        res.send(allnotes);
    }catch(e){
        res.send(e);
    }
})

app.get("/notes/:id" , async (req,res) => {
    try{
        const _id = req.params.id;
        const specificnote = await Note.findById(_id);
        
        if(!specificnote){
            return res.status(404).send();
        }else{
            res.send(specificnote);
        }
    }catch(e){
        res.status(500).send(e);
    }
})

app.patch("/notes/:id" , async (req,res) => {
    try{
        const _id = req.params.id;
        const updatenote = await Note.findByIdAndUpdate(_id,req.body,{
            new : true
        });
        if(!updatenote){
            return res.status(404).send();
        }else{
            res.send(updatenote);
        }
    }catch(e){
        res.status(400).send(e);
    }
})

app.delete("/notes/:id", async(req,res) => {
    try{
        const deletenote = await Note.findByIdAndDelete(req.params.id);
        if(!req.params.id){
            return res.status(400).send();
        }
        res.send(deletenote);
    }catch(e){
        res.status(500).send(e);
    }
})

app.listen(port,  () => {
    console.log(`connection is running on ${port}`);
})
