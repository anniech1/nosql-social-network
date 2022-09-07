const router = require('express').Router();

const {
  getAllThought,
  createThought,
  getThoughtById,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction
} = require('../../controllers/thought-controler');

router
  .route('/')
  .get(getAllThought)
  .post(createThought);

// //single thought by id here
router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// //route endpoints as they appear in instructions
router
  .route('/:thoughtId/reactions')
  .post(addReaction);

  router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction);

module.exports = router;