const { ObjectId } = require('mongoose').Types;
const { Thought } = require('../models');

module.exports = {
    // Get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Get a single thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId})
            if (!thought) {
                return res.status(404).json({ message: 'No thought with this ID' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Add new thought
    async addThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.json(thought);
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.userId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            res.json({ message: 'Thought deleted '});
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Add a reaction
    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: {reactions: req.body }},
                { runValidators: true, new: true}
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with that ID' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Remove a reaction
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: {reactions: req.params.reactionId }},
                { runValidators: true, new: true}
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with that ID' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};