import { useEffect, useState } from "react"
import { getCommentsByArticleId } from "../../../../api"
import CommentCard from "./CommentCard"

function CommentsList(props){
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    useEffect(() => {
        setIsLoading(true)
        getCommentsByArticleId(props.articleID).then((comments) => {
            setIsLoading(false)
            setComments(comments)
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
    return (<section id="comments-section">
        {comments.map((comment) => {
            return (<CommentCard comment_id={comment.comment_id} author={comment.author} body={comment.body} created_at={comment.created_at} votes={comment.votes}/>)
        })}
    </section>)
}

export default CommentsList