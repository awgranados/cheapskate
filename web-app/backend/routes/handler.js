const express = require('express');
const router = express.Router();
const Schemas = require('../models/Schemas.js');

// router.get('/addUser', async(req, res) => {
//     const user = {username: 'user_two', fullname: 'User Two'};
//     const newUser = new Schemas.Users(user);

//     try {
//         await newUser.save( async(err, newUserResult) => {
//             console.log('New user created!');
//             res.end('New user created!');
//         });
//     } catch (err) {
//         console.log(err);
//         res.end('User not added!');
//     }
// });

router.get('/lists', async(req, res) =>{
    const lists = Schemas.Lists;

    const userLists = await lists.find({}).populate("user").exec((err, listData) => {
        if (err) throw err;
        if(listData) {
            res.end(JSON.stringify(listData));
        }
        else{
            res.end();
        }
    })
});

router.post('/addList', async(req, res) => {
    const userList = req.body.listInput;
    const user = Schemas.Users;
    const userId = await user.findOne({username:'user_one'}).exec();

    const newList = new Schemas.Lists({
        list: userList,
        user: userId._id
    });

    try {
        await newList.save( (err, newListResults) => {
            if (err) res.end("Error Saving.");
            res.redirect('/lists');
            res.end();
        });
    }catch (err){
        console.log(err);
        res.redirect('/lists');
        res.end();
    }
});

module.exports = router;