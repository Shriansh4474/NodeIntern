const mongoose = require("mongoose");
const validator = require("validator");


// you can see all the schema and validation for Notes input


const noteSchema = new mongoose.Schema({
    title : {
        type:String,
        required:true,
        maxlength:25,
        unique:[true,"Input already present"],
        validate(value){
            if(validator.isEmpty(value)){
                throw new Error("Invalid Input")
            }
        }
    },
    text : {
            type:String,
            required:true,
            maxlength:100,
            validate(value){
                if(validator.isEmpty(value)){
                    throw new Error("Invalid Input")
                }
            }

    }


},

{
    timestamps : true

})

// New Collection

const Note = new mongoose.model('Note',noteSchema);

module.exports = Note;
