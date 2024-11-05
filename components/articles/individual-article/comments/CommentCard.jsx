import { useEffect, useState } from "react"
import { updateCommentVoteCount } from "../../../../api"

function CommentCard(props){
    const {comment_id, author, body, created_at, votes} = props
    const [currentVoteCount, setCurrentVoteCount] = useState(votes)
    const [error, setError] = useState("")
    return (<div className="comment">
        <label key={`comment-${comment_id}-author`} className="comment-author-label">Author: {author}</label>
        <label key={`comment-${comment_id}-created-at`} className="comment-created-at-label">Created at {created_at}</label>
        <p key={`comment-${comment_id}-body`} className="comment-body-label">{body}</p>
        <label key={`comment-${comment_id}-votes`} className="comment-votes-label">Votes: {currentVoteCount}</label>
        <button key={`comment-${comment_id}-vote-button`} className="comment-vote-button" onClick={handleClick}>Vote for this comment</button>
        <label>{error ? error : null}</label>
    </div>)

    function handleClick(event){
        event.preventDefault()
        setCurrentVoteCount((currentVoteCount) => {
            return currentVoteCount + 1
        })
        updateCommentVoteCount(comment_id).catch((err) => {
            setError("Your vote could not be added. Please try again later.")
            event.target.disabled = true
            setCurrentVoteCount((currentVoteCount) => {
                return currentVoteCount - 1
            })
            setTimeout(() => {
                event.target.disabled = false
                setError("")
            }, 5000)
        })
    }
}

export default CommentCard