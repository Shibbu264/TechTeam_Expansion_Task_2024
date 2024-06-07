const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    name: String,
    branch: String,
   
    email: {
      type: String,
      validate: {
        validator: function(v) {
          return /^[a-zA-Z0-9._%+-]+@itbhu\.ac\.in$/.test(v);
        },
        message: props => `${props.value} is not a valid @itbhu.ac.in email!`
      },
      required: [true, 'Email is required'],
      unique: true,
    },
    phone: {
      type: String,
      validate: {
        validator: function(v) {
          return /^\d{10}$/.test(v);
        },
        message: props => `${props.value} is not a valid 10-digit phone number!`
      },
      required: [true, 'Phone number is required'],
      unique:true,
    }
  });



  const registration = mongoose.model('registration',registrationSchema);
  module.exports=registration;