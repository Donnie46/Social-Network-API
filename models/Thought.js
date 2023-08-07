const { Schema, model } = require('mongoose');
const dayjs = require('dayjs');
const reactionSchema = require('./Reaction');

// Schema to create a course model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (time) => dayjs(time).format("MM/DD/YYYY"),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [
      reactionSchema
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema
  .virtual('reactionCount')
  // Getter method
  .get(function () {
    return `${this.reactions.length}`;
  })

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
