import { useEffect, useState } from "react"
import { getAllArticles, getArticlesByTopic } from "../../api.js"
import ArticleCard from "./ArticleCard.jsx"
import { useSearchParams } from "react-router-dom"

import SortByRadioGroup from "./SortByRadioGroup.jsx"
import OrderRadioGroup from "./OrderRadioGroup.jsx"

function ArticlesList(){
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const topicQuery = searchParams.get("topic")
    useEffect(() => {
        setIsLoading(true)
        const apiRequest = topicQuery ? getArticlesByTopic(topicQuery) : getAllArticles()
        apiRequest.then((articles) => {
            setIsLoading(false)
            setError("")
            setArticles(articles)
        }).catch((err) => {
            setIsLoading(false)
            setError("ERROR: Could not fetch articles. Please try again later.")
        })
    }, [topicQuery])
    if(isLoading){
        return <p>Now loading...</p>
    }
    if(error){
        return <p>{error}</p>
    }
    return (<>
        <SortByRadioGroup/>
        <br></br>
        <OrderRadioGroup/>
        <br></br>
        <label>Filtered by: {topicQuery ? topicQuery : "none"}</label>
        <div id="articles-list">
            {articles.map((article) => {
                return <ArticleCard key={`article-${article.article_id}`} article={article}/>
            })}
        </div>
    </>)
}

export default ArticlesList