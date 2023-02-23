const puppeteer = require('puppeteer');

async function scrapeProduct(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

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
        
//         x_path_image = '//*[@id="search_resultsRows"]/a[' + num_text + ']/div[1]/img';
//         var [el4] = await page.$x(x_path_image);
//         var get_img = await el4.getProperty('src');
//         var img = await get_link.jsonValue(); 

//         console.log({name, price, link, img});
        console.log({name, price, link});
    }

    browser.close();
}

module.exports = scrapeProduct("https://store.steampowered.com/search/?term=call+of+duty")
