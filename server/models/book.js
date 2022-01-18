const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    id:{
        type:String
    },
    genre:{
        type:String
    },
    authorId:{
        type:String
    }
})
const book = mongoose.model("Book",bookSchema);
module.exports = book;