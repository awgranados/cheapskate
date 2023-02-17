const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

async function scrapeProduct(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    function Game(name, price, link) {
        this.name = name
        this.price = price
        this.link = link
    }

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

        games.push(new Game(name, price, link))
    }

    for (i = 0; i < games.length; i++) {
        var dict = {}
        dict['name'] = games[i].name
        dict['price'] = games[i].price
        dict['link'] = games[i].link
        data[i] = dict
    }

    browser.close();
    return data
}

app.get('/scrape/:url', async (req, res) => {
    const { url } = req.params;
    console.log(url)
    data = await scrapeProduct(url)
    console.log(data)
    res.send(data);
  });

module.exports = scrapeProduct;
  