function alertSearch(string){
    alert("searching for "+string)
}

const form = document.getElementById("searchForm")
const table = document.getElementById("data-table");

form.addEventListener("submit", function(){
    const val = document.getElementById("name").value
    alertSearch(val)
}, false)

form.addEventListener("submit", event => {
    event.preventDefault();
  
    info = [["CoD", "$19.99"],
            ["Halo", "$14.99"],
            ["Minecraft", "$5"]]
  
    for(let i = 0;i<info.length;i++){
      const gameInfo = info[i]
      console.log(gameInfo)
      const row = `<td>${gameInfo[0]}</td><td>${gameInfo[1]}</td>`
      table.innerHTML += row;
    }
    table.style.display = "block";
  });
  