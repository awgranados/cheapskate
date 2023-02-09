const form = document.getElementById("searchForm");
const table = document.getElementById("data-table");

form.addEventListener("submit", function(e){
    table.innerHTML = "<tr><th>Title</th><th>Original</th><th>Discount</th><th>Link</th></tr>";
    table.style.display = "none";
    e.preventDefault();

    const stringParam = document.getElementById("name").value;
    param = "";
    words = stringParam.split(" ");
    for (let i = 0; i < words.length; i++){
        param = param.concat("", words[i]);
        if (i != words.length-1){
            param = param.concat("+");
        } 
    }
    console.log(param);

    const site = "https://store.steampowered.com/search/?term=";
    const url = site.concat("", param);

    console.log("fetching...");
    fetch(`http://localhost:3000/scrape/${encodeURIComponent(url)}`)
    .then(response => response.json())
    .then(data => {
      
        for(let i = 0;i<data.length;i++){
            const game = data[i];
            console.log(game);

            let costs = game.price.split("$");
            costs = costs.filter(c => c.length > 0);
            let cost1 = "N/A";
            let cost2 = "N/A";
            if (costs.length > 0 && costs[0] !== "0") {
            cost1 = "$" + costs[0];
            }
            if (costs.length > 1 && costs[1] !== "0") {
            cost2 = "$" + costs[1];
            }

            const row = `<td>${game.name}</td><td>${cost1}</td><td>${cost2}</td><td><a href=${game.link}>Store Link</a></td>`;
            table.innerHTML += row;
          }
          table.style.display = "block";
    });
}, false);
