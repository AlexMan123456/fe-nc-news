import { useEffect, useState } from "react"
import { getCommentsByArticleId } from "../../../../api.js"
import CommentCard from "./CommentCard.jsx"
import PageIndicators from "../../../pagination/PageIndicators.jsx"
import { useSearchParams } from "react-router-dom"

function CommentsList(props){
    const {comments, setComments} = props
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const p = searchParams.get("p")

    useEffect(() => {
        setIsLoading(true)
        getCommentsByArticleId(props.articleID, {p}).then((comments) => {
            setIsLoading(false)
            setError("")
            setComments(comments)
        }).catch((err) => {
            setIsLoading(false)
            setError("ERROR: Could not fetch comments. Please try again later.")
        })
    }, [searchParams])
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
        <PageIndicators/>
    </section>)
}

export default CommentsList