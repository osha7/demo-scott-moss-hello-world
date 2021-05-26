// create a schema

const gql = require('graphql-tag'); 

//template tag
// takes whatever we put into this string and 
// compiles it into graphQL-ast that can be understood by server
const typeDefs = gql`
    type User {
        email: String!
        avatar: String!
        friends: [User]!
    }

    type Query {
        me: User!
    }

`

//string, Int, Float, Boolean, ID(string but meant to be used as unique identifier: scalar
// '!' --> non null --> is expected to always have a value, it's required
// friends: [User] --> friends are an ARRAY of users
// []! --> the array should be non null, not the items in the array, but the array itself
// [User!]! --> always has to be an array and always has to have something in it

// at minimum a schema needs a QUERY!
//  by default graphql is expecting 'type Query'

// fields resolve to types




//  resolvers:
    // have to be the same as they are in the typeDefs
    // it's job is to return something that looks exactly like what the typeDef looks like
const resolvers = {
    Query: {
        me() {
            return {
                email: 'yoda@master.com',
                avatar: 'http: //yoda.png',
                friends: []
            }
        }
    }
}


//server: 

const { ApolloServer } = require('apollo-server');

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen(4000)
    .then(() => console.log('listening on port 4000'))

    // to run this: 

    // npm install apollo-server graphql
    // npm i graphql-tag
    // node demo.js
    //  navigate to: http://localhost:4000/

    // graphql playground -> to explore graphql api
    // docs: show you all the queries that you're capable of doing
    // schema: shows you the schema plus what apollo is doing for you
    