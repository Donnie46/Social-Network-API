const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, "does not match email!"]
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      }
    ],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

userSchema
  .virtual('friendCount')
  // Getter method
  .get(function () {
    return `${this.friends.length}`;
  })


const User = model('user', userSchema);

module.exports = User;
