const mongoose = require('mongoose');
const MongooseSchema = mongoose.Schema;

/* We build our Mongodb Mongoose Model Schema using our graphql types - NOTICE WHAT WE USE AND DO NOT USE ***ID is created by MongoDB so we do not add it to our model files
const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'Documentation for user...',
  fields: () => ({
    id:      {type: GraphQLID},
    name:    {type: GraphQLString},
    age:     {type: GraphQLInt},
    driving: {type: GraphQLString}
*/

const userSchema = new MongooseSchema({
  name:    String, //GraphQLString
  age:     Number, //GraphQLInt
  driving: String  //GraphQLString
})

module.exports = mongoose.model('User', userSchema);
