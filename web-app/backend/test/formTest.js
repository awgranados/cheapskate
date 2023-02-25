const request = require('supertest');
const { expect } = require('chai');
const Schemas = require('../models/Schemas');
const app = require('../index');

describe('/postForm endpoint', () => {
  it('should save a new game with title and description fields for the given user', async () => {
    const user = Schemas.Users;
    const userId = await user.findOne({ username: 'clifford' }).exec();
    // const newUser = { username: 'JohnDoe', fullname: 'John Doe' };
    // const createdUser = await user.create(newUser);
    // const userId = createdUser._id;
    const postData = { user: userId, title: 'call of duty', description: 'pew pew'};
    // const response = await request(app)
    //   .post('/postForm')
    //   .send(postData);
    // expect(response.status).to.equal(200);

    try {
      const savedGame = await Schemas.Games.findOne({ user: userId }).exec();
      console.log('Saved game:', savedGame);
      expect(savedGame.title).to.equal(postData.title);
      expect(savedGame.desc).to.equal(postData.description);
    } catch (error) {
      console.log('Error while finding game:', error);
      throw error;
    }
    
  }).timeout(1000);
});
