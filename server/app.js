//install nodemon to autorefresh   npm install nodemon -g
//run your app using               nodemon app
const express = require('express'); //npm install express --save

//    {  function   }
const { graphqlHTTP } = require('express-graphql'); //npm install graphql --save

const schema = require('./schema/schema');//Import our schema for use in app.use

const app = express();

//localhost:4000/graphql
app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema: schema, //Telling our app that we are using the schema.js file for our scheme. Since this is ES6 we can omit writting schema:schema and just write schema
})) 

//npm app.js
app.listen(4000, () => {
  console.log('Listening on port 4000 using express and node');
})

