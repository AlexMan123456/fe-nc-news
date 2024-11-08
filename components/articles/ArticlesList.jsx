import { useEffect, useState } from "react"
import { getArticles } from "../../api.js"
import ArticleCard from "./ArticleCard.jsx"
import PageIndicators from "../pagination/PageIndicators.jsx"
import { Link, useLocation, useSearchParams } from "react-router-dom"
import getSearchParams from "../../utils/get-search-parameters.js"
import setQuery from "../../utils/set-query.js"

function ArticlesList(props){
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const {topic, sort_by, order, limit, p} = getSearchParams(searchParams)
    const location = useLocation()
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
        {articles.length === 0 ? 
            <section>
                <h2>There are no articles on this page!</h2>
                <Link to={`${setQuery(location.search, "p", 1)}`}>Return to page 1</Link>
            </section>
            :
            <div id="articles-list">
                {articles.map((article) => {
                    return <ArticleCard key={`article-${article.article_id}`} article={article}/>
                })}
                <PageIndicators/>
            </div>}
    </>)
}

export default ArticlesList