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
        return <label>Now loading...</label>
    }
    if(error){
        return <label>{error}</label>
    }
    return (<>
    <article>
       <ArticleContents article={article}/> 
    </article>
    <h3>Comments</h3>
    <CommentsSection articleID={article.article_id}/>
    </>)
}

export default ArticlePage