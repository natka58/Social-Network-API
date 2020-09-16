const { Thought, User } = require('../models');

const thoughtController = {
    // get all thought    
    getAllThoughts(req, res) {
        Thought.find({})
            .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // Id thought
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: `No thought found with id ${params.id}` });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    //create thought
    createThought({ body }, res) {
        console.log(body.userId)
        Thought.create(body)
            .then(({ _id }) => {
                User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
                    { new: true, runValidators: true }
                );
            })

            .then(dbThoughtData => {
                console.log(dbThoughtData)
                res.json(dbThoughtData)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    },
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: `No thought found with id ${params.id}` });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);

            });
    },
deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
    .then(dbThoughtData => {
        if (!dbThoughtData) {
        res.status(404).json({ message: `No thought found with ID: ${params.id}` });
        return;
        }
        res.json(dbThoughtData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
},

addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $push: { reactions: body }},
        { new: true, runValidators: true}
    )
    .populate({
        path: 'reactions',
        select: '-__v'
    })
    .select('-__v')
    .then(dbReactionData => {
      if (!dbReactionData) {
        res.status(404).json({ message: `No thought with id ${params.thoughtID}` });
        return;
      }
      res.json(dbReactionData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
},
deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
    .then(dbReactionData => res.json(dbReactionData))
     
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  }
}
module.exports = thoughtController;