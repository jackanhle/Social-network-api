const { User, Thought } = require('../models');
module.exports = {
    getThoughts(req, res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    getThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .then((thought) => 
        !thought
        ? res.status(404).json({ message: 'No thought with that Id' })
        :res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    createThought (req, res) {
        Thought.create(req.body)
            .then(({ username, _id }) => {
                return User.findOneAndUpdate(
                    { username: username },
                    { $push: { thoughts: _id }},
                    { runValidators: true, new: true }
                )
            })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No User found with this ID" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought) => 
        !thought
        ? res.status(404).json({ message: 'No thought with that ID' })
        : User.findOneAndUpdate(
            { username: thought.username },
            { $pull: {thoughts: req.params.thoughtId }},
            { runValidators: true, new:true}
            )
        )
        .then((user) =>
        !user
            ? res.status(404).json({ message: "No User found with that ID" })
            : res.json({ message: "Thought has been deleted" })
    )
    .catch((err) => res.status(500).json(err));
},
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new:true }
        )
        .then((thought) => 
        !thought
        ? res.status(404).json({ message: 'No thought with this id!'})
        : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    newReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
        .then(thought => 
            !thought
                ? res.status(404).json({ message: "No Thought found with this ID" })
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },


    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId }}},
            { runValidators: true, new: true }
        )
        .then(thought => 
            !thought
                ? res.status(404).json({ message: "No thought found with this ID" })
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    }
};