const router = require('express').Router();

const {
    getAllUsers,
    createUser,
    getUserById,
    addFriend,
    updateUser,
    deleteUser,
    deleteFriend
  } = require('../../controllers/user-controller')

//get, post, put, and delete routes
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

router
.route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

router
  .route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(deleteFriend);

  module.exports = router