function alertSearch(string){
    alert("Searching for "+string)
}

document.getElementById("searchButton").addEventListener("click", 
    function(){
        alertSearch(document.getElementById("query").value)
    }, false);
