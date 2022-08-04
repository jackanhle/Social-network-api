const router = require('express').Router();
const {
    getThoughts,
    getThought,
    createThought,
    updateThought,
    deleteThought,
    newReaction,
    deleteReaction,

} = require('../../controllers/thought-controller');

router.route('/').get(getThoughts).post(createThought);
router
.route('/:thoughtId')
.get(getThought)
.put(updateThought)
.delete(deleteThought);

router.route('/:thoughtId/reactions').post(newReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;