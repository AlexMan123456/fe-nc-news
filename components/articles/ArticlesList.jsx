import { useEffect, useState } from "react"
import { getArticles } from "../../api.js"
import ArticleCard from "./ArticleCard.jsx"
import PageIndicators from "../pagination/PageIndicators.jsx"
import { useSearchParams } from "react-router-dom"
import getSearchParams from "../../utils/get-search-parameters.js"

function ArticlesList(props){
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const {topic, sort_by, order, limit, p} = getSearchParams(searchParams)
    useEffect(() => {
        setIsLoading(true)
        getArticles({topic, sort_by, order, limit, p}).then((articles) => {
            setIsLoading(false)
            setError("")
            setArticles(articles)
        }).catch((err) => {
            setIsLoading(false)
            setError("ERROR: Could not fetch articles. Please try again later.")
        })
    }, [searchParams])
    if(isLoading){
        return <p>Now loading...</p>
    }
    if(error){
        return <p>{error}</p> 
    }
    return (<>
        <div id="articles-list">
            {articles.map((article) => {
                return <ArticleCard key={`article-${article.article_id}`} article={article}/>
            })}
        </div>
        <PageIndicators/>
    </>)
}

export default ArticlesList