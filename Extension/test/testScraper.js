const expect = require('chai').expect;
const scrapeProduct = require('../../steam-scraper/app.js');

describe('scraper', function() {
  it('should return an array of games', async function() {
    this.timeout(100000);
    const url = "https://store.steampowered.com/search/?term=call+of+duty"
    const games = await scrapeProduct(url);
    expect(games).to.be.an('array');
    expect(games[0]).to.have.property('name');
    expect(games[0]).to.have.property('price');
    expect(games[0]).to.have.property('link');
  });
});
