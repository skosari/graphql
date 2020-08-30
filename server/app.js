//install nodemon to autorefresh   npm install nodemon -g
//run your app using               nodemon app
const express = require('express'); //npm install express --save

//    {  function   }
const { graphqlHTTP } = require('express-graphql'); //npm install graphql --save

const schema = require('./schema/schema.js');

const app = express();

//localhost:4000/graphql
app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema: schema
})) 

//npm app.js
app.listen(4000, () => {
  console.log('Listening on port 4000 using express and node');
})

