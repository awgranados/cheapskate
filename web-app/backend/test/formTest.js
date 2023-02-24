const request = require('supertest');
const { expect } = require('chai');
const Schemas = require('../models/Schemas');
const app = require('../routes/handler');
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI, {
  bufferCommands: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // Increase the timeout value
});

describe('/postForm endpoint', () => {
  it('should save a new game with title and description fields for the given user', async () => {
    const user = await Schemas.Users.create({ username: 'Levi' });
    const postData = { title: 'New Game', description: 'This is a new game' };
    const response = await request(app)
      .post('/postForm')
      .send(postData);

    expect(response.status).to.equal(200);

    const savedGame = await Schemas.Games.findOne({ user: user._id }).exec();

    expect(savedGame.title).to.equal(postData.title);
    expect(savedGame.desc).to.equal(postData.description);
  }).timeout(25000);

  after(async () => {
    await mongoose.connection.close();
  });
});
