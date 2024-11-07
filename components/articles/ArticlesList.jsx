import { useEffect, useState } from "react"
import { getArticles, getArticlesWithQueries } from "../../api.js"
import ArticleCard from "./ArticleCard.jsx"
import { useLocation, useSearchParams } from "react-router-dom"

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
        return <label>Now loading...</label>
    }
    if(error){
        return <label>{error}</label> 
    }
    return (<>
        <div id="article-query-labels">
            <label>Filtered by topic: {topic ? topic : "none"}</label>
            <label>Sort by: {sort_by ? sort_by : "date"}</label>
            <label>Order: {order ? order + "ending" : "descending"}</label>
        </div>
        <div id="articles-list">
            {articles.map((article) => {
                return <ArticleCard key={`article-${article.article_id}`} article={article}/>
            })}
        </div>
    </>)
}

export default ArticlesList