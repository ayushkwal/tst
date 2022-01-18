const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList } = require('graphql');
const _ = require('lodash');
const Book = require('../models/book')
const Author = require('../models/author')


//Dummy Data
// var books = [
//     { id: '1', name: 'A One Arabian', genre: 'Sci-Fi',authorId:'1' },
//     { id: '2', name: 'A phantom book', genre: 'Thriller',authorId:'2' },
//     { id: '3', name: 'A Fantasy World 2', genre: 'Fantasy',authorId:'3' }
// ]

// var authors = [
//     { id: '1', name: 'Rabi', nature: 'Sci-Fi', age: '35' },
//     { id: '2', name: 'Phanto', nature: 'Thriller', age: '76' },
//     { id: '3', name: 'Fanta', nature: 'Fantasy', age: '66' }
// ]

//Defining Types

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author:{
            type:AuthorType,
            resolve(parent,args)
            {
                // return _.find(authors,{id:parent.authorId})
               return Author.findOne({id:parent.authorId});
            }

        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        nature: { type: GraphQLString },
        age: { type: GraphQLString },
        books:{
            type: new GraphQLList(BookType),
            resolve(parent,args){
                // return _.filter(books,{authorId:parent.id})
                return Book.find({authorId:parent.id})
            }
        }
    })
})


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //MongoDB Connection
                // return _.find(books, { id: args.id });
                return Book.findOne({id:args.id});
            }
        },
        author: { 
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //MongoDB Connection
                // return _.find(authors, { id: args.id })
                return Author.findById(args.id)
            }
        },
        books:{
            type: new GraphQLList(BookType),
            resolve(parent,args){
                // return books
                return Book.find({});
            }
        },
        
        authors:{
            type: new GraphQLList(AuthorType),
            resolve(parent,args){
                // return authors
                return Author.find({});
            }
        }
    }
})

//Mutation for inserting data
const mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addAuthor:{
            type:AuthorType,
            args:{
                name:{type:GraphQLString},
                id:{type:GraphQLString},
                age:{type:GraphQLString},
            },
            resolve(parent,args){
                let author = new Author({
                    name:args.name,
                    id:args.id,
                    age:args.age
                });
                return author.save();
            }
        },
        addBook:{
            type:BookType,
            args:{
                name:{type:GraphQLString},
                id:{type:GraphQLString},
                genre:{type:GraphQLString},
                authorId:{type:GraphQLString},
            },
            resolve(parent,args){
                let book = new Book({
                    name:args.name,
                    id:args.id,
                    genre:args.genre,
                    authorId:args.authorId
                });
                return book.save();
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation:mutation
})
