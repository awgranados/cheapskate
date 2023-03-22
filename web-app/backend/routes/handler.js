const express = require('express');
const puppeteer = require('puppeteer')
const router = express.Router();
const Schemas = require('../models/Schemas.js');
const { Lists, Users } = require('../models/Schemas');

async function scrapeProduct(url) {
  console.log("starting to scrape")
  const browser = await puppeteer.launch();
  console.log("in between");
  const page = await browser.newPage();
  console.log("finished setup awaits")
  await page.goto(url);
  function Game(name, price, link, img) {
      this.name = name
      this.price = price
      this.link = link
      this.img = img
  }

  console.log("finished page goto")
  var data = []
  games = new Array();

  for(let i = 1; i < 6; i++){
      let num_text = i.toString();

      x_path_title = '//*[@id="search_resultsRows"]/a[' + num_text + ']/div[2]/div[1]/span';
      var [el] = await page.$x(x_path_title);
      var get_name = await el.getProperty('textContent');
      var name = await get_name.jsonValue(); 

      x_path_price = '//*[@id="search_resultsRows"]/a[' + num_text + ']/div[2]/div[4]/div[2]';
      var [el2] = await page.$x(x_path_price);
      var get_price = await el2.getProperty('textContent');
      var price = await get_price.jsonValue();
      price = price.replace(/(\r\n|\n|\r|\t)/gm, "").trim();

      x_path_link = '//*[@id="search_resultsRows"]/a[' + num_text + ']/@href';
      var [el3] = await page.$x(x_path_link);
      var get_link = await el3.getProperty('textContent');
      var link = await get_link.jsonValue(); 

      x_path_image = '//*[@id="search_resultsRows"]/a[' + num_text + ']/div[1]/img';
      var [el4] = await page.$x(x_path_image);
      var get_img = await el4.getProperty('src');
      var img = await get_img.jsonValue(); 

      games.push(new Game(name, price, link, img))
  }
  console.log("retrieved game data")
  for (i = 0; i < games.length; i++) {
      var dict = {}
      dict['name'] = games[i].name
      dict['price'] = games[i].price
      dict['link'] = games[i].link
      dict['img'] = games[i].img
      data[i] = dict
  }
  console.log("done")
  browser.close();
  return data
}


router.get('/scrape/:url', async (req, res, err) => {
  const { url } = req.params;
  console.log(url)
  try{
      data = await scrapeProduct(url)
      console.log(data)
      res.status(200).send(data);
  }
  catch{
      console.log(err);
      res.status(500).send("error");
  }
});

router.get('/list/:id', async (req, res) => {
  const { id } = req.params;
  const lists = Schemas.Lists;
  const games = Schemas.Games;

  try {
    const userLists = await lists.findById(id).populate('games.game').populate('user')
    const tuples = userLists.games.map(tuple => ({
      game: tuple.game,
      review: tuple.review
    }));
    res.send(tuples);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error')
  }
  // const userLists = await lists.findById(id)
  //   .populate('games.game')
  //   .populate('user')
  //   .exec((err, listData) => {
  //     if (err) throw err;
  //     if (listData) {
  //       res.end(JSON.stringify(listData.games));
  //     } else {
  //       res.end();
  //     }
  //   });

})

router.post('/addUser', (req, res) => {
  const user = {username: req.body.username, fullname: req.body.fullname};
  const newUser = new Schemas.Users(user);

  newUser.save((err, newUserResult) => {
    if (err) {
      console.log(err);
      res.end('User not added!');
    } else {
      console.log('New user created!');
      res.end('New user created!');
    }
  });
});

// router.get('/lists', async (req, res) => {
//   const lists = Schemas.Lists;
  
//   const userLists = await lists.find({})
//     .populate('user')
//     .exec((err, listData) => {
//       if (err) throw err;
//       if (listData) {
//         res.end(JSON.stringify(listData));
//       } else {
//         res.end();
//       }
//     });
// });

router.get('/lists/:userid', async (req, res) => {
  const lists = Schemas.Lists;
  const { userid } = req.params;
  const user = await Schemas.Users.findOne({ uid: userid }).exec();
  // console.log(userid)
  // console.log(user.id);
  
  const userLists = await lists.find({ user: user.id })
    .exec((err, listData) => {
      if (err) throw err;
      if (listData) {
        res.end(JSON.stringify(listData));
      } else {
        res.end();
      }
    });
});

router.post('/addList/:userid', async (req, res) => {
  const { userid } = req.params;
  const listTitle = req.body.listInput
  console.log("adding")
  const user = await Schemas.Users.findOne({ uid: userid }).exec();

  const newList = new Schemas.Lists({
    list: listTitle,
    user: user._id
  });
  try {
    await newList.save((err, newListResults) => {
      let val = JSON.stringify(newListResults)
      console.log(val);
      res.status(200).send(val);
    });
      
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/postForm/:userid', async (req, res) => {
  const { userid } = req.params;

  const gameTitle = req.body.title;
  const gameDesc = req.body.description;
  const selectedList = req.body.selectedList;
  const lists = Schemas.Lists;
  const userList = await lists.findById(selectedList)

  const userId = await Users.findOne({ uid: userid }).exec();

  const newGame = new Schemas.Games({
    desc: gameDesc,
    title: gameTitle,
    user: userId._id,
    selectedList: selectedList
  });

  await newGame.save();

  userList.games.push({ game: newGame._id, review: 0});
  await userList.save()

  console.log("GamePosted!!")
  try {
    newGame.save((err, newGameResults) => {
      res.status(200).send(JSON.stringify(newGameResults));
    });
  } catch (err) {
    res.status(500).send(err);
  }
});
console.log("End")
module.exports = router;

//GET GAMES
router.get('/games', async (req, res) => {
  try {
    const games = await Schemas.Games.find({});
    res.status(200).send(JSON.stringify(games));
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/games/:id', async (req, res) => {
  try {
    const games = await Schemas.Games.find({ selectedList: req.params.id }, 'title').exec();
    res.status(200).send(JSON.stringify(games));
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/addGame/:id', async (req, res) => {
  console.log(req)
  const { id } = req.params;
  const gameTitle = req.body.name;
  const image = req.body.img;

  const lists = Schemas.Lists;
  const userList = await lists.findById(id)
  const userId = await Users.findOne({ username: 'clifford' }).exec();

  const newGame = new Schemas.Games({
    title: gameTitle,
    user: userId._id,
    img: image,
    selectedList: id
  });
  await newGame.save();

  userList.games.push({ game: newGame._id, review: 0 });
  await userList.save()


  const g = await Schemas.Games.findById(newGame._id);
  const tuple = { game: g, review: 0 };
  res.send(tuple);
});

router.put('/updateScore/:gameId', async (req, res) => {
  console.log(req);
  try {
    const game = await Schemas.Games.findByIdAndUpdate(
      req.params.gameId,
      { $set: { score: req.body.score } },
      { new: true }
    );
    res.status(200).send(JSON.stringify(game));
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    await Schemas.Lists.findByIdAndDelete(req.params.id);
    res.status(200).send("List deleted");
  } catch (err) {
    res.status(500).send(err);
  }
});


// Create a new user
router.post("/users", async (req, res) => {
  try {
    const name = req.body.email;
    const userID = req.body.uid;

    // Check if user already exists
    // const existingUser = await Schemas.Users.findOne({ name });
    // if (existingUser) {
    //   console.log("user alr exists")
    //   return res.status(400).json({ msg: 'User already exists' });
    // }

    // Create new user object
    const newUser = new Schemas.Users({
      email: name,
      uid: userID
    });

    // Save new user to database
    await newUser.save();

    res.status(201).json(newUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});