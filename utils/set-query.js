function setQuery(queryString, queryKey, newQueryValue){
    let queryKeyFound = false
    const currentQueries = queryString.split("?").join("").split("&").map((query) => {
        return query.split("=")
    })
    for(const index in currentQueries){
        if(currentQueries[index][0] === queryKey){
            queryKeyFound = true
            currentQueries[index] = [queryKey, newQueryValue]
            break
        }
    }
    if(queryKeyFound === false){
        currentQueries.push([queryKey, newQueryValue])
    }
    return `?${currentQueries.map((query) => query.join("=")).join("&")}`
}

export default setQuery

