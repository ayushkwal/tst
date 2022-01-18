import React,{useState,useEffect} from "react";
import {gql,useMutation,useQuery} from '@apollo/client'

const getAuthorQuery = gql`
            {
                authors{
                    name
                    id
                }
            }
`
const addBookQuery = gql`
            mutation($name:String,$genre:String,$authorId:String,$id:String){
                addBook(id:$id,name:$name,genre:$genre,authorId:$authorId){
                    name
                    id
                }
            }
`


function AddBook(){
    
    const [name,setName] = useState('');
    const [genre,setGenre] = useState('');
    const [id,setId] = useState('');
    const [authorId,setauthorId] = useState('');
    const [addbook,setAddbook] = useState();
    const [send, setSend] = useState(0)
    


    useEffect(() => {
        setId(Math.floor(Math.random()*100000+1).toString());
        console.log(authorId)
        if(send==1)
        {
            bookData({
                variables:{
                    name:name,
                    genre:genre,
                    id:id,
                    authorId:authorId
                }
            })
        }
        setSend(0)
    }, [send])



    const authorData = useQuery(getAuthorQuery);
    const [bookData,{data,error}] = useMutation(addBookQuery);
    console.log(error)
    if (authorData.loading) return <p>Loading...</p>;
	else if (authorData.error) return <p>Error :(</p>;
    else
    return(
        <>
            <h4>Add Book</h4>
            <div className="bookform">
                <form id="addbookform">
                    <input type={Text} name="bookname" placeholder="Book Name" onChange={(e)=>setName(e.target.value)}></input>
                    <input type={Text} name="bookgenre" placeholder="Book Genre" onChange={(e)=>setGenre(e.target.value)}></input>
                    <select onChange={(e)=>{setauthorId(e.target.value)}}>
                        <option disabled> Select Author</option>
                         {
                         authorData.data.authors.map((pauthor)=>{
                                return <option value={pauthor.id}>{pauthor.name}</option>
                            })
                        }
                    </select>
                    <button onClick={(e)=>setSend(1)}>+</button>
                </form>
            </div>
        </>
    )
}

export default AddBook