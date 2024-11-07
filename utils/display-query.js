function displaySortByQuery(queryValue){
    if(queryValue === "created_at"){
        return "date"
    }
    if(queryValue === "comment_count"){
        return "comment count"
    }
    return "votes"
}

export default displaySortByQuery