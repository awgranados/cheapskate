const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI, {
  bufferCommands: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 300000, // Increase the timeout value
});
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: false },
  fullname: { type: String, required: false },
  entryDate: { type: Date, default: Date.now }
});

const listSchema = new Schema({
  list: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'users' }
});

const gameSchema = new Schema({
  title: { type: String, required: true },
  desc: { type: String, required: false },
  user: { type: Schema.Types.ObjectId, ref: 'users' }
});

const Users = mongoose.model('users', userSchema, 'users');
const Lists = mongoose.model('lists', listSchema, 'lists');
const Games = mongoose.model('games', gameSchema, 'games');
const mySchemas = { 'Users': Users, 'Lists': Lists, 'Games': Games };

module.exports = mySchemas;
