const {UserList, MovieList} = require("../fake-data")
const _ = require ("lodash")

const resolvers = {
    Query: {
        //user revolvers
        users(){
            return UserList
        },
        user: (parent, args) => {
            const user = _.find(UserList, {id: Number(args.id)})
            return user
        },
        //movie resolvers
        movies: () => {
            return MovieList;
        },
        movie: (parent, args) =>{
            const mov = _.find(MovieList, {name: args.name});
            return mov;
        },
        
    },
    User: {
        favouriteMovie: () => {
            return _.filter(MovieList, (mov)=> mov.yearOfPublication>=2000 &&mov.yearOfPublication <= 2010 )
        }
    },
    Mutation: {
        createUser: (parent, args) => {
            console.log('oneone')
            const user = args.input;
            const lastId = UserList[UserList.length-1].id;
            user.id = lastId+1;
            UserList.push(user);

            return user;
        },

        updateUsername: (parent, args) => {
            let userUpdate;
            const id = args.input.id;
            const newUsername = args.input.newUsername;
            UserList.forEach((user)=> {

                if( user.id == Number(id)){
                    user.username = newUsername
                    userUpdate = user
                    console.log('updating')
                }
            })
            return userUpdate;
        },
        deleteUser: (parent, args) => {
            const id = args.id;
            _.remove(UserList, (user)=> user.id == Number(id))
            return null;
        },
    }
}

module.exports = {resolvers};