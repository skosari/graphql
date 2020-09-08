const mongoose = require('mongoose');
const MongooseSchema = mongoose.Schema; 

const userSchema = new MongooseSchema({
  title: String,
  description: String,
  userId: String
})

module.exports = mongoose.model('Hobby', userSchema);