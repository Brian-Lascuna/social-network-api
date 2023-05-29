const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    addThought,
    deleteThought,
    addReaction,
    deleteReaction,
} = require('../../controllers/ThoughtController');

// api/thoughts
router.route('/').get(getThoughts).post(addThought);

// api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought);

// api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// api/users/:thoughtId/reactions/:reactionsId
router.route('/:thoughtId/reactions/:reactionsId').delete(deleteReaction);

module.exports = router;