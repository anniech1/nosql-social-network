const { Thought, User } = require("../models");

const thoughtController = {
//get
  getAllThought(req, res) {
    Thought.find({})
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => { res.sendStatus(400);});
  },

  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: "Sorry! Could not find thought." });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        res.sendStatus(400);
      });
  },

//post
createThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true },
        )
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'Sorry! Could not create user!' })
          return
        }
        res.json(dbUserData)
      })
      .catch((err) => res.json(err))
  },

  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'Sorry! Could not add reaction!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

//put
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,

      runValidators: true,
    })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "Sorry! Could not update thought." });
          return;
        }
        res.json(dbThoughtData);
      })
    .catch((err) => res.json(err));
  },
  
  // delete
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: "Sorry! Could not delete." });
        };
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res
            .status(404)
            .json();
        }res.json();
      })
      .catch((err) => res.json(err));
  },


  // delete reaction
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.json(err));
  }
}

module.exports = thoughtController;