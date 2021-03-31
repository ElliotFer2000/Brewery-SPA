
function breweriesCache(){
    return Object.freeze({
        getBreweries,
        addBreweries,
        addFavorite,
        getFavorites
    })

    function getBreweries(name){
        const breweries = localStorage.getItem(name)

        return JSON.parse(breweries)
    }

    function addBreweries(name,breweries){
        localStorage.setItem(name,JSON.stringify(breweries))
    }

    function addFavorite(brewery){
        const result = JSON.parse(localStorage.getItem("favorites"))

        if(result){
            localStorage.setItem("favorites",JSON.stringify({"results": [...result.results,brewery]}))
        }else{
            localStorage.setItem("favorites",JSON.stringify({"results": [brewery]}))
        }
    }

    function getFavorites(){
        console.log(JSON.parse(localStorage.getItem("favorites")))
        return JSON.parse(localStorage.getItem("favorites"))
    }
}

export default breweriesCache