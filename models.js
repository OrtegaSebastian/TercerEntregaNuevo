const mongoose = require('mongoose');

module.exports = mongoose.model('Users', {
    username: String,
    password: String,
    firstName: String,
    age:Number,        
    lastName: String,
    uploaded_file:String,
    email: String
});

