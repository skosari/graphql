const mongoose = require('mongoose');
const MongooseSchema = mongoose.Schema;

const userSchema = new MongooseSchema({
  comment: String
})

module.exports = mongoose.model('Post', userSchema);
