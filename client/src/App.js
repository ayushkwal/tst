import './App.css';
import React,{Component} from 'react';
import BookList from './components/booklist';
import AddBook from './components/addBook'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://localhost:80/graphql',
  cache: new InMemoryCache()
});

// client
// .query({
//   query: gql`
//     query GetRates {
//       rates(currency: "USD") {
//         currency
//       }
//     }
//   `
// })
// .then(result => console.log(result));

function App() {
  return (
    <ApolloProvider client={client}>
    <>
    <h1>Book Lists</h1>
    <h4>All Books are:</h4>
    <BookList />
    <AddBook />
    </>
    </ApolloProvider>
  );
}

export default App;
