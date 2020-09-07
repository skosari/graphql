const graphql = require('graphql');
//import graphql from 'graphql'; ES6

const {
  GraphQLObjectType,
  GraphQLStringType,

} = graphql

//Scalar Types


//Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'Description',
  fields: {
    
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  //mutation: RootMutation
})
