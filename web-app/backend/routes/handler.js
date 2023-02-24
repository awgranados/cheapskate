const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const Schemas = require('../models/Schemas.js');
const { Lists, Users } = require('../models/Schemas');

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
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error adding list');
      return;
    }

// router.get('/lists', async(req, res) =>{
//     const lists = Schemas.Lists;

//     const userLists = await lists.find({}).populate("user").exec((err, listData) => {
//         if (err) throw err;
//         if(listData) {
//             res.end(JSON.stringify(listData));
//         }
//         else{
//             res.end();
//         }
//     })
// });

    const { listInput } = fields;
    const user = await Users.findOne({ username: 'user_one' }).exec();

    const newList = new Lists({
      list: listInput,
      user: user._id
    });

    try {
      await newList.save();
      res.status(200).send('List added successfully!');
    } catch (err) {
      console.log(err);
      res.status(500).send('Error adding list');
    }
  });
});

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
      if (err) {
        res.status(500).send('Error Saving.');
        console.log(err);
      }
    });
  } catch (err) {
    console.log(err);
    res.redirect('/form');
    res.end();
  }
});

module.exports = router;
