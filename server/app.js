//install nodemon to autorefresh   npm install nodemon -g
//run your app using               nodemon app
const express = require('express'); //npm install express --save


//    {  function   }
const { graphqlHTTP } = require('express-graphql'); //npm install graphql --save


//Import Schema
const schema = require('./schema/schema');//Import our schema for use in app.use
//Learning scalar and object types - on Scalar__Types branch
//const testSchema = require('./schema/types_schema')


//Import express.JS
const app = express();


//npm install mongoose --save    install in server folder
const mongoose = require('mongoose');
//MongoDB cloud.mongodb.com skosari-graphql
//API public key - QGAJDQRT
//API private key - 0640f492-fef4-4f6b-839d-76ce93c2f858
/*
  mongodb+srv://skosari:corgow-jamry5-pummyQ@skosari-graphql.mnrqf.mongodb.net/skosari-graphql?retryWrites=true&w=majority
*/
mongoose.connect('mongodb+srv://skosari:corgow-jamry5-pummyQ@skosari-graphql.mnrqf.mongodb.net/skosari-graphql?retryWrites=true&w=majority', { useNewUrlParser: true,  useUnifiedTopology: true  });
mongoose.connection.once('open', () => {
  console.log('We are connected');
})


//localhost:4000/graphql
app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema: schema //Telling our app that we are using the schema.js file for our scheme. Since this is ES6 we can omit writting schema:schema and just write schema
})) 


//npm app.js
app.listen(4000, () => {
  console.log('Listening on port 4000 using express and node');
})

