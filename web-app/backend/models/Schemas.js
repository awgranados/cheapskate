const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type:String, required:true},
    fullname: {type:String, required:true},
    entryDate: {type:Date, default:Date.now}
});

const listSchema = new Schema({
    lists: {type:String, required:true},
    user: {type:Schema.Types.ObjectId, ref:'users'}
});

const gameSchema = new Schema({
    title: {type:String, required:true},
    description: {type:String, required:true},
    user: {type:Schema.Types.ObjectId, ref:'users'}
});

const Users = mongoose.model('users', userSchema, 'users');
const Lists = mongoose.model('lists', listSchema, 'lists');
const Games = mongoose.model('games', gameSchema, 'games');
const mySchemas = {'Users': Users, 'Lists': Lists, 'Games': Games};

module.exports = mySchemas;

