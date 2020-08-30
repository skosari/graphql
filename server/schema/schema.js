const graphql = require('graphql');

//Access our necessary graphql classes
const  {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema

} = graphql

//Create Types
const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'Documentation for user...',
  fields: () => ({
    id: {type: GraphQLString},//GraphQLID will cast the input as a unique ID
    name: {type: GraphQLString},//GraphQLString will cast the input as a string
    age: {type: GraphQLInt}//GraphQLInt will cast the input as integer
  })
});

//RootQuery the first query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'Description',
  fields: {
    user: {
      type: UserType,
      args: {
        id: {type: GraphQLString}
      },
      resolve(parent, args) {
        //We resolve with date
        //get and return data from a datasource

      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
})

