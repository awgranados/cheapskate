const request = require('supertest');
const { expect } = require('chai');
const Schemas = require('../models/Schemas');
const app = require('../index');
const { Lists } = require('../models/Schemas');

describe('/addGame endpoint', () => {
  it('should add a new game to the user\'s list', async () => {
    const user = Schemas.Users;
    const newUser = { username: 'JohnDoe', fullname: 'John Doe' };
    const createdUser = await user.create(newUser);
    const userId = createdUser._id;
    const list = await Lists.findById('6415186ba5cf463c6b9fdb0f');
    console.log(list);
    const postData = { name: 'Call of Duty', selectedList: list};
    const response = await request(app)
      .post(`/addGame/${list._id}`)
      .send(postData);

    expect(response.status).to.equal(200);
    expect(response.body.game.title).to.equal(postData.name);
    expect(response.body.game.img).to.equal(postData.img);

    const updatedList = await Schemas.Lists.findById(list._id).populate('games.game').exec();
    expect(updatedList.games[updatedList.games.length - 1].game.title).to.equal(postData.name);
    expect(updatedList.games[updatedList.games.length - 1].review).to.equal(0);
  }).timeout(10000);
});
