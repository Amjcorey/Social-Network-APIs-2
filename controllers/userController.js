const { User, Thought } = require("../models");

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const user = await User.find({});
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a single user by id
  async getUser({ params }, res) {
    try {
      const user = await User.findOne({ _id: params.id });

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create an user
  async createUser({ body }, res) {
    try {
      const user = await User.create(body);
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
   // Update user
   async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No user with this id!" });
      }

      return res.status(200).json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete one user and user's thoughts by id
  async deleteUser({ params }, res) {
    try {
      const { thoughts } = await User.findOneAndDelete({ _id: params.id });
      await thoughts.deleteMany({ _id: { $in: thoughts } });
      res.json({ message: "User and user thoughts were deleted!" });

      if (!user) {
        res.status(404).json({ message: "No user with that ID" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Add a user's friend
  async addFriend({ params }, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: params.userId },
        { $addToSet: { friends: friendId } },
        { new: true }
      );

      if (!user) {
        res.status(404).json({ message: "No one found with this id!" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete friend
  async deleteFriend(req, res) {
    try {
      const friend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!friend) {
        return res.status(404).json({ message: "Check user and friend ID" });
      }

      return res.status(200).json(friend);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
};


// Exports
// module.exports = userController;