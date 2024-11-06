import { useEffect, useState } from "react"
import { getAllArticles, getArticlesWithQueries } from "../../api.js"
import ArticleCard from "./ArticleCard.jsx"
import { useLocation, useSearchParams } from "react-router-dom"

function ArticlesPage(){
    const location = useLocation()
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const topicQuery = searchParams.get("topic")
    useEffect(() => {
        setIsLoading(true)
        const apiRequest = location.search ? getArticlesWithQueries(location.search) : getAllArticles()
        apiRequest.then((articles) => {
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
        <label>Filtered by: {topicQuery ? topicQuery : "none"}</label>
        <div id="articles-list">
            {articles.map((article) => {
                return <ArticleCard key={`article-${article.article_id}`} article={article}/>
            })}
        </div>
    </>)
}

export default ArticlesPage