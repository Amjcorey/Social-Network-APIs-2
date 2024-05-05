const { Schema, model, Types } = require("mongoose");
const Thought = require('./Thought');

// Schema to create User model
const userSchema = new Schema (
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/.+@.+\..+/, 'Please fill a valid email address']
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
    },
    id: false,
  }
);


// Updates friend count in User model object after the User adds one or more friends
userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

// Creates the User model using the userSchema
const User = model('User', userSchema);

// Exports User model
module.exports = User;
