const form = document.getElementById("searchForm")
const table = document.getElementById("data-table");

form.addEventListener("submit", function(e){
    e.preventDefault();

    const stringParam = document.getElementById("name").value
    param = ""
    words = stringParam.split(" ")
    for (let i = 0; i < words.length; i++){
        param = param.concat("", words[i])
        if (i != words.length-1){
            param = param.concat("+")
        } 
    }
    console.log(param)

    const site = "https://store.steampowered.com/search/?term="
    const url = site.concat("", param)

    console.log("fetching...")
    fetch(`http://localhost:3000/scrape/${encodeURIComponent(url)}`)
    .then(response => response.json())
    .then(data => {
        // console.log(data)
        document.getElementById("result").innerHTML = JSON.stringify(data, null, 2);

        for(let i = 0;i<data.length;i++){
            const game = data[i]
            console.log(game)
            const row = `<td>${game.name}</td><td>${game.price}</td><td><a href=${game.link}>Store Link</a></td>`
            table.innerHTML += row;
          }
          table.style.display = "block";
    });
}, false)
