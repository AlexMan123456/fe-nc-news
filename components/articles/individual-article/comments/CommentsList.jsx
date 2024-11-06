import { useEffect, useState } from "react"
import { getCommentsByArticleId } from "../../../../api"
import CommentCard from "./CommentCard"

function CommentsList(props){
    const {comments, setComments} = props
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    useEffect(() => {
        setIsLoading(true)
        getCommentsByArticleId(props.articleID).then((comments) => {
            setIsLoading(false)
            setError("")
            setComments(comments)
        }).catch((err) => {
            setIsLoading(false)
            setError("ERROR: Could not fetch comments. Please try again later.")
        })
    }, [])
    if(isLoading){
        return <label>Now loading...</label>
    }
    if(error){
        return <label>{error}</label>
    }
    return (<section id="comments-section">
        {comments.map((comment) => {
            return (<CommentCard key={`${comment.comment_id}-card`} comment={comment} setComments={setComments}/>)
        })}
    </section>)
}

export default CommentsList