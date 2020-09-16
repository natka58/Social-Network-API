const { Schema, model } = require('mongoose');
const moment = require('moment');
require('mongoose-type-email');

const UserSchema = new Schema(
    {
username: {
type: String,
unique: true,
required: true,
trim: true
},

email: {
    type: String,
    unique: true,
required: true,
type: mongoose.SchemaTypes.Email
},

thoughts: [
    {
    type: Schema.Types.ObjectId,
    ref: 'Thought'
    }
],

friends: [
    {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
]
    },
    {
        toJSON: {
          virtuals: true,
          getters: true
        },
        id: false
      }
    );

// get total count of comments and replies on retrieval
Userchema.virtual('friendCount').get(function() {
    return this.friends.reduce((total, friends) => total + friends.length + 1, 0);
  });
  
   
    // create the Pizza model using the PizzaSchema
  const User = model('User', UserSchema);
  
  // export the Pizza model
  module.exports = User;
