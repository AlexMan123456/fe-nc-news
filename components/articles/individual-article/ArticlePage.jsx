import { useParams } from "react-router-dom"
import { getArticleById } from "../../../api"
import { useEffect, useState } from "react"
import ArticleContents from "./ArticleContents"
import CommentsSection from "./comments/CommentsSection"
import VoteButtons from "../../vote-buttons/VoteButtons"

function ArticlePage(props){
    const [article, setArticle] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [fetchError, setFetchError] = useState(false)
    const [currentVoteCount, setCurrentVoteCount] = useState(0)
    const [voteError, setVoteError] = useState(false)
    const articleID = useParams().article_id


    useEffect(() => {
        setIsLoading(true)
        getArticleById(articleID).then((article) => {
            setIsLoading(false)
            setFetchError("")
            setArticle(article)
            setCurrentVoteCount(article.votes)
        }).catch((err) => {
            setIsLoading(false)
            setFetchError("ERROR: Could not fetch article. Please try again later.")
        })
    }, [])
    if(isLoading){
        return <p>Now loading...</p>
    }
    if(fetchError){
        return <p>{fetchError}</p>
    }
    return (<>
    <ArticleContents article={article} currentVoteCount={currentVoteCount}/>
    <VoteButtons contents={article} setCurrentVoteCount={setCurrentVoteCount} setError={setVoteError}/>
    <p>{voteError ? voteError : null}</p>
    <CommentsSection articleID={article.article_id}/>
    </>)
}

export default ArticlePage