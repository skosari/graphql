const mongoose = require('mongoose');
const MongooseSchema = mongoose.Schema;

const userSchema = new MongooseSchema({
  comment: String,
  userId: String
})

module.exports = mongoose.model('Post', userSchema);
