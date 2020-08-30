//npm install graphql
const graphql = require('graphql');

//Access our necessary graphql classes
const  {
  GraphQLObjectType, //making new query objects like rootquery
  GraphQLSchema, //export our root query with
  GraphQLID, //for ID types but we didnt use
  GraphQLString, 
  GraphQLInt
} = graphql


//Create Types
const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'Documentation for user...',
  fields: () => ({//Notice its wrapped in () to return everything inside
    //We use functions to define everything before its run and prevent undefined errors
    id: {type: GraphQLString},//GraphQLID will cast the input as a unique ID but for simplicity we used GraphQLString
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
      args: {id: {type: GraphQLString}}, //Arguments we pass along when we want to retrieve data from our user:
      resolve(parent, args) { // a function that tells graphql where to get the information - get and return data from a datasource
        let user = {//We add a user and return it then we can access it in graphiQL
          id: "234",
          name: "Siamak",
          age: 39
        }
        return user;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
})

//A schema is a map of all the data and how they relate/interact
