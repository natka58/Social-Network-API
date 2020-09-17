const router = require('express').Router();

const {
  getAllThought,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction
} = require('../../controllers/thought-controller');

// Set up GET all and POST at /api/thought
// /api/thought
router
  .route('/')
  .get(getAllThought);
  


 // Set up GET one, PUT, and DELETE at /api/thought/:id
router
.route('/:id') 
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought);

router
.route('/:userId')
.post(createThought);

router
.route('/:thoughtId/reactions')
.post(addReaction);

router
.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);

module.exports = router;