const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    newThought,
    updateThought,
    deleteThought,
    newReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

// prep GET all and POST /api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(newThought)

// prep GET, PUT, and DELETE by ID /api/thoughts/:id
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// prep POST and DELETE (add/remove reactions)
router
    .route('/:thoughtId/reactions')
    .post(newReaction)
    .delete(deleteReaction)

module.exports = router;
