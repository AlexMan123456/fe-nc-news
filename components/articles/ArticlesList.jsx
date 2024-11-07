import { useEffect, useState } from "react"
import { getArticles, getArticlesWithQueries } from "../../api.js"
import ArticleCard from "./ArticleCard.jsx"
import { useLocation, useSearchParams } from "react-router-dom"
import displaySortByQuery from "../../utils/display-query.js"

function ArticlesList(){
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const topic = searchParams.get("topic")
    const sort_by = searchParams.get("sort_by")
    const order = searchParams.get("order")
    useEffect(() => {
        setIsLoading(true)
        getArticles({topic, sort_by, order}).then((articles) => {
            setIsLoading(false)
            setError("")
            setArticles(articles)
        }).catch((err) => {
            setIsLoading(false)
            setError("ERROR: Could not fetch articles. Please try again later.")
        })
    }, [location.search])
    if(isLoading){
        return <p>Now loading...</p>
    }
    if(error){
        return <p>{error}</p> 
    }
    return (<>
        <div id="article-query-labels">
            <p aria-label={`Filtered by topic: ${topic ? topic : "none"}.`}>Filtered by topic: {topic ? topic : "none"}</p>
            <p aria-label={`Sort by: ${sort_by ? displaySortByQuery(sort_by) : "date"}.`}>Sort by: {sort_by ? displaySortByQuery(sort_by) : "date"}</p>
            <p>Order: {order ? order + "ending" : "descending"}</p>
        </div>
        <div id="articles-list">
            {articles.map((article) => {
                return <ArticleCard key={`article-${article.article_id}`} article={article}/>
            })}
        </div>
    </>)
}

export default ArticlesList