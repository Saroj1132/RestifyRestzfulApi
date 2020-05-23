const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const userrSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  }
  
});

userrSchema.plugin(timestamp);

const User = mongoose.model('User', userrSchema);
module.exports = User;