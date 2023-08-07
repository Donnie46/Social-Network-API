const { Thought, User } = require("../models");

module.exports = {
  // get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .then((thoughts) => res.json(thoughts))
      .catch((error) => res.status(500).json(error.msg));
  },
  // get thought by id
  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-___v")
      .then((thought) =>
        !thought
          ? res.status(400).json({ message: "Thought ID does not exist." })
          : res.json(thought)
      )
      .catch((error) => res.status(500).json(error.msg));
  },
  // create new thought
  newThought(req, res) {
    Thought.create(req.body)
      .then((thoughts) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thoughts._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({
                message:
                  "User ID does not exist. Thought created without user data.",
              })
          : res.json("Thought created")
      )
      .catch((error) => res.status(500).json(error));
  },
  // update thought by id
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "Thought ID does not exist." })
          : res.json(thought)
      )
      .catch((error) => res.status(500).json(error));
  },
  // delete thought by id
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "Thought ID does not exist." })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "User ID does not exist. Thought deleted." })
          : res.json({ message: "Thought successfully deleted" })
      )
      .catch((error) => res.status(500).json(error));
  },
  //create new reaction
  newReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { reactions: body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "Thought ID does not exist." })
          : res.json(thought)
      )
      .catch((error) => res.status(500).json(error));
  },
  // delete reaction
  deleteReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: body.reactionId } } },
      { new: true, runValidators: true })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "Thought ID does not exist." })
          : res.json(thought))
      .catch((error) => res.status(500).json(error));
  },
};
