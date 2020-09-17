const { User } = require('../models');

const userController = {
  // get all users    
      getAllUser(req, res) {
          User.find({})
          .populate({
            path: 'thoughts',
            path: 'frigheds',
            select: '-__v'
            
          })
          .select('-__v')
          .sort({ _id: -1 })
          .then(dbUserData => res.json(dbUserData))
              .catch(err => {
                console.log(err);
                res.status(500).json(err);
              });
          },
     // get one user by id
     getUserById({ params }, res) {
      User.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        path: 'friends',
        select: '-__v'
      })
      .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });      
  },
  // create User
  createUser({ body }, res) {
      User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    }, 
  
    // update User by id
  updateUser({ params, body }, res) {
   
      User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({ message: `No user found with id ${params.id}` });
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
  
    // delete User
  deleteUser({ params }, res) {
      User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({ message: `No user found with id ${params.id}`});
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },
  
  // add friend
  addFriend({ params }, res) {
      console.log(params);
  User.findOneAndUpdate(
      {_id: params.userId},
      { $push: { friends: params.friendId }},
  ) 
  .then(dbFriend => {
      if (!dbFriend) {
          res.status(404).json({ message: `No user found with id ${params.id}`});
          return;    
      }
      res.json(dbFriend);
  })  
  .catch(err => res.status(400).json(err)); 
  },
  
  // delete Friend
  deleteFriend({ params }, res) {
      User.findOneAndUpdate(
          {_id: params.userId},
          { $push: { friends: params.friendId}},
          { new: true, runValidators: true} )
          .then(dbFriendData =>  res.json(dbFriendData))
              .catch(err => res.status(400).json(err)); 
          }
      }
module.exports = userController;