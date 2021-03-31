function breweries(httpClient,baseURL){

    return Object.freeze({
        getSuggestionNames,
        getBreweries,
        getBrewery
    })

    async function getSuggestionNames(searchTerm){
        const names = await httpClient.get(`${baseURL}/breweries/autocomplete?query=${searchTerm}`)
        
        return names.data
    }

    async function getBreweries(searchTerm,pageNumber,perPage){
        const breweries = await httpClient.get(`${baseURL}/breweries?by_name=${searchTerm}&per_page=${perPage}&page=${pageNumber}`)
       
        return breweries.data
    }

    async function getBrewery(id){
        const brewerie = await httpClient.get(`${baseURL}/breweries/${id}`)
       
        return brewerie.data
    }
}

export default breweries;