//npm install graphql
const graphql = require('graphql');

//lodash - a library of utility functions we can use on our arrays/data
//npm i --save lodash     install inside your apps root folder
var _ = require('lodash');

//Import MongoDB models
const User = require('../model/user');
const Post = require('../model/post');
const Hobby = require('../model/hobby');

//Dummy Data
// var usersData = [
//   {id:'1', name:'Siamak',   age: 39, driving: 'yes'},
//   {id:'2', name:'Kambiz',   age: 51, driving: 'yes'},
//   {id:'3', name:'Jenelle',  age: 39, driving: 'yes'},
//   {id:'4', name:'Myles',    age: 6,  driving: 'no'},
//   {id:'5', name:'Everrete', age: 6,  driving: 'no'},
//   {id:'6', name:'Leia',     age: 2,  driving: 'no'},
// ]
// var hobbyData = [
//   {id:'1', title:'RC Cars',   description: 'battery operated small scale radio controlled cars',   userId: '1'},
//   {id:'2', title:'RC Boats',  description: 'battery operated small scale radio controlled boats',  userId: '4'},
//   {id:'3', title:'RC Planes', description: 'battery operated small scale radio controlled planes', userId: '1'},
// ]
// var postData = [//We add the userID that the posData corresponds to in this case usersData.id
//   {id: '1', comment: 'first post',  userId: '3' },
//   {id: '2', comment: 'second post', userId: '1' }
// ]

//Access our necessary graphql classes
const  {
  GraphQLObjectType, //making new query objects like rootquery
  GraphQLSchema, //export our root query with
  GraphQLID, //for ID types - when inputing data make sure to wrap id in '' but you can omit the "" when querying data
  GraphQLString, //string types
  GraphQLInt, //numbers
  GraphQLNonNull, //required types - in graphiql you will see an ! next to doced objects/scalars
  GraphQLList //GraphQLList is used when we want to query the relationships between in this case user to posts and hobby from a user query
} = graphql


//Create Types
const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'Documentation for user...',
  fields: () => ({//Notice its wrapped in () to return everything inside
    //We use functions to define everything before its run and prevent undefined errors
    id: {type: GraphQLID},//GraphQLID will cast the input as a unique ID but for simplicity we used GraphQLString
    name: {type: GraphQLString},//GraphQLString will cast the input as a string
    age: {type: GraphQLInt},//GraphQLInt will cast the input as integer
    driving: {type: GraphQLString},
    
    posts: {
      type: new GraphQLList(PostType),//use GRaphQLList to find the posts from a user query
      resolve(parent, args) {
        //return _.filter(postData, {userId: parent.id});//find posts related to the userId from postData that corresponds to the user.id of userType which is linked to usersData in the RootQuery
      }
    },
    hobby: {
      type: new GraphQLList(HobbyType),//use GRaphQLList to find the posts from a user query
      resolve(parent, args) {
        //return _.filter(hobbyData, {userId: parent.id});
      }
    }
  })
});

const HobbyType = new GraphQLObjectType({
  name: 'Hobby',
  description: 'Hobby Description',
  fields: () => ({
    id: {type: GraphQLID},
    title: {type: GraphQLString},
    description: {type: GraphQLString},
    userId: {type: new GraphQLNonNull(GraphQLID)},
    user: {
      type: UserType,
      resolve(parent, args){
        //return _.find(usersData, {id: parent.userId})
      
        //return the UserType-parent
        return User.findById(parent.userId);      //mongoose method
      }
    }
  })
});

const PostType = new GraphQLObjectType({
  name: 'Post',
  description: 'Post',
  fields: () => ({
    id: {type: GraphQLID},
    comment: {type: GraphQLString},
    userId: {type: new GraphQLNonNull(GraphQLID)},
    user: {
      type: UserType,
      resolve(parent, args) {
        //return _.find(usersData, {id: parent.userId})//return userID from the parent-PostType that corresponds to the user:{type: UserType} userID is listed in PostType as the id from usersData
        //
        return User.findById(parent.userId);          //mongoose method
      }
    }
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
        //return _.find(usersData, {id: args.id})//return in userData the args.ida - notice {id: args.id} was defined under user.args
      
        //return our user by id using a mongoose model query
        return User.findById(args.id);
      

      }
    },
    
    //query all user data
    users: {
      type: GraphQLList(UserType),
      resolve(parent, args){
        //return usersData;
        //
        //find all users using mongoose method
        return User.find({});
      }
    },

    hobby: {
      type: HobbyType,
      args: {id: {type: GraphQLString}},
      resolve(parent, args) {
        //return _.find(hobbyData, {id: args.id}) //Make hobbyData and notice the camel case
        return Hobby.findById(args.id);           //mongoose method 
        
      }
    },

    //query all hobbies
    hobbies: {
      type: GraphQLList(HobbyType),
      resolve(parent,args){
        //return hobbyData;                       //localhost
        //
        return Hobby.find({});                    //mongose method
      }
    },

    post: {
      type: PostType,
      description: 'Post new item',
      args: {id: {type: GraphQLID}},
      resolve(parent,args){
        //return data (post data)                 //localhost
        //return _.find(postData, {id: args.id})  //lodash
        
        return Post.findById(args.id);            //mongoose method

      }
    },

    //query all posts - posts is also used inside the user query to fgind the post of that individuals posts so if this ia usaed outside a user query then it will pull up all posts made regardless of user
    posts: {
      type: GraphQLList(PostType),
      resolve(parent,args){
        //return postData;                        //localhost
        
        return Post.find({});                     //mongoose method
      }
    },
  }
});

//Tutorial Mutation - very simple example
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Tutorial provided basic mutation type',
  fields: {
    CreateUser: {
      type: UserType,
      args: {
        //id: {type: GraphQLID}, //removed for MongoDB
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        driving: {type: GraphQLString}
      },
      resolve(parent,args) {
        let user = new User ({ //User was imported from our model files
          //id: args.id, //removed for MongoDB
          name: args.name,
          age: args.age,
          driving: args.driving
        });
          //This will save to memory not in database for tutorial only
          //return user; //remove () when saving to memory

          //Save to MongoDB using model files
          user.save();
          
          //Save to graphi
          return user;
      }
    },

    CreatePost: {
      type: PostType,
      args: {
        //id: {type: GraphQLID}, //remove for MongoDB
        comment: {type: GraphQLString},
        userId: {type: GraphQLID}
      },
      resolve(parent, args) {
        let post = new Post ({
          //id: args.id, //removed for MongoDB
          comment: args.comment,
          userId: args.userId 
        });
        //return post;
        post.save();

        //graphi
        return post;
      }
    },

    CreateHobby: {
      type: HobbyType,
      args: {
        //id: {type: GraphQLID},  //removed for MongoDB
        title: {type: GraphQLString},
        description: {type: GraphQLString},
        userId: {type: GraphQLID}
      },
      resolve(parent, args) {
        let hobby = new Hobby ({
          //id: args.id, //removed for MongoDB
          title: args.title,
          description: args.description,
          userId: args.userId
        });
        //return hobby;
        hobby.save();
      
        //graphi
        return hobby;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})

//A schema is a map of all the data and how they relate/interact
