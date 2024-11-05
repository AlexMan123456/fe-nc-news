import { useParams } from "react-router-dom"
import { getArticleById } from "../../../api"
import { useEffect, useState } from "react"
import ArticleContents from "./ArticleContents"
import CommentsSection from "./comments/CommentsSection"

function ArticlePage(props){
    const [article, setArticle] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    const articleID = useParams().article_id
    useEffect(() => {
        setIsLoading(true)
        getArticleById(articleID).then((article) => {
            setIsLoading(false)
            setError("")
            setArticle(article)
        }).catch((err) => {
            setIsLoading(false)
            setError("ERROR: Could not fetch article. Please try again later.")
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
       <ArticleContents article_id={articleID} title={article.title} author={article.author} image={article.article_img_url} body={article.body} created_at={article.created_at} votes={article.votes}/> 
    </article>
    <h3>Comments</h3>
    <CommentsSection articleID={article.article_id}/>
    </>)
}

export default ArticlePage