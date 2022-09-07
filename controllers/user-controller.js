const { User} = require("../models");

const userController = {
//get
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        res.sendStatus(400);
      });
    },

    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
          .populate({
            path: 'thoughts',
            select: '-__v',
          })
          .populate({
            path: 'friends',
            select: '-__v',
          })
          .select('-__v')
          .then((dbUserData) => res.json(dbUserData))
          .catch((err) => {
            res.status(404).json(err)
          })
      },

//put
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, {
          new: true,
          runValidators: true,
        })
          .then((dbUserData) => {
            if (!dbUserData) {
              res.status(404).json(err);
            }
            res.json(dbUserData);
          })
          .catch((err) => res.json(err));
      },  

//post
    createUser({ body }, res) {
        User.create(body)
          .then((dbUserData) => res.json(dbUserData))
          .catch((err) => res.status(400).json(err))
      },

//delete
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },

  //get
    addFriend({ params }, res) {
      User.findOneAndUpdate(
        { _id: params.userId },
        { $push: { friends: params.friendId } },
        { new: true }
      )
        .then((dbUserData) => {
          if (!dbUserData) {
            res.status(404).json({ message: 'Sorry! No user found.' });
            return;
          }
          res.json(dbUserData);
        })
        .catch((err) => res.status(400).json(err));
    },
  
//delete
    deleteFriend({ params }, res) {
      User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { friends: params.friendId } },
        { new: true }
      )
        .then((dbUserData) => {
          if (!dbUserData) {
            res.status(404).json({ message: 'Sorry! No user found.' });
            return;
          }
          res.json(dbUserData);
        })
        .catch((err) => res.status(400).json(err));
    }
  };
  
  
  module.exports = userController