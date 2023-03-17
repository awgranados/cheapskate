const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: false },
  uid: { type: String, required: false },
  entryDate: { type: Date, default: Date.now }
});

const listSchema = new Schema({
  list: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'users' },
  games: [{ 
    game: { type: Schema.Types.ObjectId, ref: 'games'}, 
    review: {type: Number, default: 0} 
  }]
});

const gameSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  title: { type: String, required: true },
  desc: { type: String, required: false },
  img: { type: String, required: false},
  selectedList: { type: String, required: true},
  score: { type: Number, required: false, default: 0 }
});


const Users = mongoose.model('users', userSchema, 'users');
const Lists = mongoose.model('lists', listSchema, 'lists');
const Games = mongoose.model('games', gameSchema, 'games');
const mySchemas = { 'Users': Users, 'Lists': Lists, 'Games': Games };

module.exports = mySchemas;
