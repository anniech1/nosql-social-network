const router = require('express').Router();

const {
  getAllThought,
  createThought,
  getThoughtById,
  updateThought,
  createReaction,
  deleteThought,
  deleteReaction
} = require('../../controllers/thought-controller');

router
  .route('/')
  .get(getAllThought)
  .post(createThought);

//single thought by id here
router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

//route endpoints as they appear in instructions
router
  .route('/:thoughtId/reactions')
  .post(createReaction);

  router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction);

module.exports = router;