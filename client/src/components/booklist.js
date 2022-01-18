import React,{useState,useEffect} from "react";
import {gql,useQuery} from '@apollo/client';

const getBookQuery = gql`
            {
                books{
                    name
                    id
                    genre
                }
            }
`

const getBookDetailQuery = gql`
            query($id:String){
                book(id:$id){
                    id
                    name
                    genre
                    author{
                        id
                        name
                        age
                        books{
                            name
                            id
                        }
                    }
                }
            }
`

function BookList(){


    const [send, setSend] = useState(0)
    const[id,setId]= useState('')
    const {loading, error, data} = useQuery(getBookQuery)
    const bookData= useQuery(getBookDetailQuery)
	

    useEffect(() => {
        // setId(Math.floor(Math.random()*100000+1).toString());
        // console.log(authorId)
        if(send==1)
        {
            bookData({
                variables:{
                    id:id
                }
            })
            console.log(bookData.data);
        }
        setSend(0)
    }, [send])

  
    if (loading) return <p>Loading...</p>;
	else if (error) return <p>Error :(</p>;
    else return(
        <>
            <h2>Lists of Books: </h2>
            <ul id="booklist">
                {data.books.map((book)=>{return <li onClick={()=>{setId(book.id);setSend(1)}}><strong>{book.name}: Type: {book.genre}</strong></li>})}
                
            </ul>
            <h5>DETAILS OF BOOK:</h5>
            
	

        </>
    )
}

export default BookList