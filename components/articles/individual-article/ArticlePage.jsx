import { useParams } from "react-router-dom"
import { getArticleById } from "../../../api"
import { useEffect, useState } from "react"
import ArticleContents from "./ArticleContents"

function ArticlePage(props){
    const [article, setArticle] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    const articleID = useParams().article_id
    useEffect(() => {
        setIsLoading(true)
        getArticleById(articleID).then((article) => {
            setIsLoading(false)
            setArticle(article)
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
    return (<>
    <article>
       <ArticleContents title={article.title} author={article.author} image={article.article_img_url} body={article.body} created_at={article.created_at} votes={article.votes}/> 
    </article>
    </>)
}

export default ArticlePage