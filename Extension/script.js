function alertSearch(string){
    alert("searching for "+string)
}

const form = document.getElementById("searchForm")

form.addEventListener("submit", function(){
    const val = document.getElementById("name").value
    alertSearch(val)
}, false)

