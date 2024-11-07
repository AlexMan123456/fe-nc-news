function setQuery(queryString, queryKey, newQueryValue){
    let queryKeyFound = false
    const queryArray = queryString.split("?").join("").split("&").map((query) => query.split("="))
    for(const index in queryArray){
        if(queryArray[index][0] === queryKey){
            queryKeyFound = true
            queryArray[index] = [queryKey, newQueryValue]
            break
        }
    }
    if(queryKeyFound === false){
        queryArray.push([queryKey, newQueryValue])
    }
    return `?${queryArray.map((query) => query.join("=")).join("&")}`
}

export default setQuery