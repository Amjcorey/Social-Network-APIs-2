const { Thought, User } = require("../models");
// const userController = require("./userController");

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thought = await Thought.find({});
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get a thought by id
  async getThought({ params }, res) {
    try {
      const thought = await Thought.findOne({ _id: params.id });

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with that ID" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a thought
  async createThought({ body }, res) {
    try {
      const thought = await Thought.create(body);
      const userData = await User.findOneAndUpdate(
        // Associate thought with the user
        { username: body.username },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a thought
  async deleteThought({ params }, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: params.id });

      if (!thought) {
        res.status(404).json({ message: "No thought with that ID" });
      }
      const userData = await User.findOneAndUpdate(
        //
        { thoughts: params.username },
        { $pull: { thoughts: params.id } },
        { new: true }
      );
      res.json(userData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Update thought by id
  async updateThought({ params, body }, res) {
    try {
      const thought = await Thoughts.findOneAndUpdate(
        { _id: params.id },
        body,
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: "No thought found with this id!" });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Add reaction to thought
  async addReaction({ params, body }, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        // Associate
        { _id: params.thoughtId },
        { $addToSet: { reactions: body } },
        { new: true }
      );
      if (!thought) {
        res.status(404).json({ message: "No thought found with this id!" });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Get all reactions for thought
//   async getReactions({ params }, res) {
//     try {
//       const thought = await Thought.findOne({ _id: params.thoughtId });
//       if (!thought) {
//         res.status(404).json({ message: "No thought found with this id!" });
//       }
//       res.json(thought);
//     } catch (err) {
//       console.log(err);
//       res.status(500).json(err);
//     }
//   },
// };

  // Delete reaction
  async deleteReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!reaction) {
        return res
          .status(404)
          .json({ message: "Check thought and reaction ID" });
      }

      return res.status(200).json(reaction);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};

// Exports
//  module.exports = thoughtController;