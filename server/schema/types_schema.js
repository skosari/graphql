const graphql = require('graphql');
//import graphql from 'graphql'; ES6

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLSchema
} = graphql

//Scalar Types
/*
  String = GraphQLString
  Int = GraphQLInt 
  Float = GraphQLFloat
  Boolean = GraphQLBoolean
  ID = GraphQLID
*/


const Person = new GraphQLObjectType ({
  name: 'Person',
  description: 'Represents a person type',
  fields: () => ({
    id:        {type: GraphQLID},
    name:      {type: GraphQLString},
    age:       {type: GraphQLInt},
    isMarried: {type: GraphQLBoolean},
    gpa:       {type: GraphQLFloat},
 
    //This is an object type - it requires us to specify a scalar. In this case we returned the parent object and we must query a scalar which would be age gpa etc...
    justAType: {
      type: Person,
      resolve(parent, args){
        return parent;
      }
    }

  })
})


//Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'Description',
  fields: { 
    person: {
      type: Person,
      resolve(parent,args) {
        let personObj = {
          id: '1',
          name: 'Motzart',
          age: 167,
          isMarried: false,
          gpa: 0.0
        }
        return personObj;
      }
    }
  }
});


module.exports = new GraphQLSchema({
  query: RootQuery
  //mutation: RootMutation
})
