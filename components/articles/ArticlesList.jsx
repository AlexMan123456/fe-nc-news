import { useEffect, useState } from "react"
import { getArticles } from "../../api"
import ArticleCard from "./ArticleCard"

function ArticlesList(){
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    useEffect(() => {
        setIsLoading(true)
        getArticles().then((articles) => {
            setIsLoading(false)
            setArticles(articles)
        }).catch((err) => {
            setIsLoading(false)
            setError(err.message)
        })
    }, [])
    if(isLoading){
        return <p>Now loading...</p>
    }
    if(error){
        return <p>{error}</p>
    }
    return (<div id="articles-list">
        {articles.map((article) => {
            return <ArticleCard key={`article-${article.article_id}`} article_id={article.article_id} title={article.title} author={article.author} created_at={article.created_at} image={article.article_img_url} topic={article.topic} votes={article.votes} comment_count={article.comment_count}/>
        })}
    </div>)
}

export default ArticlesList