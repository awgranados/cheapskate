const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const Schemas = require('../models/Schemas.js');
const { Lists, Users } = require('../models/Schemas');

router.get('/addUser', async(req, res) => {
    const user = {username: 'user_two', fullname: 'User Two'};
    const newUser = new Schemas.Users(user);

    try {
        await newUser.save( async(err, newUserResult) => {
            console.log('New user created!');
            res.end('New user created!');
        });
    } catch (err) {
        console.log(err);
        res.end('User not added!');
    }
});
router.get('/lists', async (req, res) => {
  const lists = Schemas.Lists;

  const userLists = await lists.find({})
    .populate('user')
    .exec((err, listData) => {
      if (err) throw err;
      if (listData) {
        res.end(JSON.stringify(listData));
      } else {
        res.end();
      }
    });
});

router.post('/addList', async (req, res) => {
  const listTitle = req.body.listInput

  const user = await Users.findOne({ username: 'clifford' }).exec();

  const newList = new Schemas.Lists({
    list: listTitle,
    user: user._id
  });
  try {
    await newList.save((err, newListResults) => {
      res.status(200).send(JSON.stringify(newListResults));
    });
      
  } catch (err) {
    res.status(500).send(err);
  }
});

// router.get('/list', async (req, res) => {

// });

router.post('/postForm', async (req, res) => {
  const gameTitle = req.body.title;
  const gameDesc = req.body.description;
  const user = Schemas.Users;
  const userId = await user.findOne({ username: 'clifford' }).exec();

  const newGame = new Schemas.Games({
    title: gameTitle,
    desc: gameDesc,
    user: userId._id
  });

  try {
    await newGame.save((err, newGameResults) => {
      res.status(200).send('Posted form!');
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;