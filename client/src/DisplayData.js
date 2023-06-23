import React, {useState} from "react"
import { useQuery, gql, useLazyQuery, useMutation } from "@apollo/client";
const QUERY_ALL_USERS = gql `
query GetAllUsers{
  users {
    age
    id
    name
    username
    nationality
  }
}
`;

const QUERY_ALL_MOVIES = gql `
query GetMovie{
  movies{
    name
    id
    yearOfPublication
    isInTheaters

  }
}
`;

const CREATE_USER_MUTUATION = gql `
    mutation CreateUser($input: createUserInput!){
        createUser(input: $input) {
            id 
            name
            age
        }
}
`;

const GET_MOVIE_BY_NAME = gql `
    query Movie($name: String!) {
        movie(name: $name){
            name
            yearOfPublication
        }
    }
`;

const DELETE_USER_MUTUATION = gql `
    mutation DeleteUser($deleteUserId: ID!) {
        deleteUser(id: $deleteUserId) {
            name
    }
}
`;


function DisplayData (){

    const [movieSearched, setMovieSearched] = useState("");

    //create user state
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [age, setAge] = useState(0);
    const [nationality, setNationality] = useState("");
    // const [id, setId] = useState();
    // console.log(id)

    const {data, loading, error, refetch} = useQuery(QUERY_ALL_USERS);
    const {data: data_movies} = useQuery(QUERY_ALL_MOVIES)
    const [fetchMovie, {data: movieSearchData, error: movieError}] = useLazyQuery(GET_MOVIE_BY_NAME, {})

    const [createUser] = useMutation(CREATE_USER_MUTUATION)
    const [deleteUser] = useMutation(DELETE_USER_MUTUATION)
    // if (loading){
    //     return <h1>Data is loading</h1>
    // }
    // if (data){
    //     console.log(data)
    // }

    // if(error){
    //     console.log(error)
    // }
    return <div>
        <div>
        <input type="text" placeholder="Name..." onChange={(event)=> {setName(event.target.value)}} />
        <input type="number" placeholder="Age..." onChange={(event)=> {setAge(event.target.value)}} />
        <input type="text" placeholder="Username..." onChange={(event)=> {setUsername(event.target.value)}}/>
        <input type="text" placeholder="Nationality..." onChange={(event)=> {setNationality(event.target.value.toUpperCase())}}/>
        <button onClick={()=>{createUser({variables:{
            input:{name, username, age : 21}
        }});
        refetch()}}>Create User</button>
        </div>

        {/* <div>
            <input type="ID" placeholder="ID..." onChange={(event)=> {setId(event.target.value)}} />
            <button onClick={()=>{deleteUser({variables:{
            input:{id}
        }});
        refetch()}}>Delete</button>
        </div> */}
        {/* {data_movies && data_movies.movies.map((mov)=>{
        return <div>
            <h1>Name : {mov.name}</h1>
            <h1>ID : {mov.id}</h1>
            <h1>Year : {mov.yearOfPublication}</h1>
            <h1>Avaliable in Theatres: {mov.isInTheaters}</h1>
            {data && data.users.map((user)=>{

})}
        </div>
        
        })} */}
    {data && data.users.map((user)=>{
    return <div>
            <h1>Id: {user.id}</h1>
            <h1>Name : {user.name}</h1>
            <h1>Username : {user.username}</h1>
            <h1>Age : {user.age}</h1>
            <h1>Nationality: {user.nationality}</h1>
        </div>
    })}
        <div>
            <input type="ID" placeholder="Interstellar..." onChange={(event)=> {setMovieSearched(event.target.value)}} />
            <button onClick={()=> {
                fetchMovie({variables: {
                    name: movieSearched
                }})
            }}>Fetch Data</button>
            <div>
            {movieSearchData && <div> 
                <h1>MovieName : {movieSearchData.movie.name}</h1>
                <h1>Year of Publication : {movieSearchData.movie.yearOfPublication}</h1>
                </div>}
            </div>
        </div>
        </div>
}

export default DisplayData;