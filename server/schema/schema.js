//npm install graphql
const graphql = require('graphql');

//lodash - a library of utility functions we can use on our arrays/data
var _ = require('lodash');

//Dummy Data
var usersData = [
  {id:1, name:'Siamak', age: 39},
  {id:2, name:'Kambiz', age: 51},
  {id:3, name:'Jenelle', age: 39},
  {id:4, name:'Myles', age: 6},
  {id:5, name:'Everrete', age: 6},
  {id:6, name:'Leia', age: 2},
]


//Access our necessary graphql classes
const  {
  GraphQLObjectType, //making new query objects like rootquery
  GraphQLSchema, //export our root query with
  GraphQLID, //for ID types but we didnt use
  GraphQLString, 
  GraphQLInt,
  GraphQLNonNull
} = graphql


//Create Types
const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'Documentation for user...',
  fields: () => ({//Notice its wrapped in () to return everything inside
    //We use functions to define everything before its run and prevent undefined errors
    id: {type: GraphQLInt},//GraphQLID will cast the input as a unique ID but for simplicity we used GraphQLString
    name: {type: GraphQLString},//GraphQLString will cast the input as a string
    age: {type: GraphQLInt}//GraphQLInt will cast the input as integer
  })
});

//RootQuery the first query - the getting of data
const RootQuery = new GraphQLObjectType({//RootQuery is also what we export
  name: 'RootQueryType',
  description: 'Description',
  fields: {
    user: {
      type: UserType,//we create userType and its fields in another const
      args: {id: {type: GraphQLInt}}, //Arguments we pass along when we want to retrieve data from our user:
      resolve(parent, args) { // a function that tells graphql where to get the information - get and return data from a datasource
        // let user = {//We add a user and return it then we can access it in graphiQL
        //   id: "234",
        //   name: "Siamak",
        //   age: 39
        // }
        // return user;
        return _.find(usersData, {id: args.id})//return in userData the args.ida - notice {id: args.id} was defined under user.args
      }
    }
  }
});

// My own mutation query not from tutorial
// const RootMutationType = new GraphQLObjectType({
//   name: 'Mutation',
//   description: 'Root Mutation',
//   fields: () => ({
//     addUser: {
//       type: UserType,
//       args: {//args are the data we pass to the server
//         // id: {type: GraphQLNonNull(GraphQLString)}, 
//         name: {type: GraphQLNonNull(GraphQLString)},
//         age: {type: GraphQLNonNull(GraphQLInt)}
//         //GraphQLNonNull means these fields are required
//       },
//       resolve: (parent, args) => {//in resolve is where we add our data to the server
//         const user = {id: usersData.length + 1, name: args.name, age: args.age}
//         usersData.push(user)
//         return user
//       }
//     }
//   })
// })

module.exports = new GraphQLSchema({
  query: RootQuery,
  // mutation: RootMutationType
})

//A schema is a map of all the data and how they relate/interact
