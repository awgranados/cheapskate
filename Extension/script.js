const form = document.getElementById("searchForm")

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
        console.log(data)
        document.getElementById("result").innerHTML = JSON.stringify(data, null, 2);
    });

}, false)