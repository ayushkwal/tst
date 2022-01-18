const mongoose = require('mongoose');
const authorSchema = new mongoose.Schema({
    // name:{
    //     type:String,
    //     required:true
    // },
    // id:{
    //     type:String
    // },
    // age:{
    //     type:String
    // }
    name:String,
    id:String,
    age:String
})
const Author = mongoose.model("Author",authorSchema);
module.exports = Author;