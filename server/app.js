const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors')

//Mongo Database Connection 
mongoose.connect('mongodb+srv://ayush:ayush1002@cluster0.jawu5.mongodb.net/GraphQL?retryWrites=true&w=majority').then(()=>{
    console.log('Connected to MongoDB')
}).catch(()=>console.log('Not Connected'))

app.use(cors())
app.use('/graphql',graphqlHTTP({
    schema:schema,
    graphiql:true
}))

app.listen(80,()=>{
    console.log('Hey');
})