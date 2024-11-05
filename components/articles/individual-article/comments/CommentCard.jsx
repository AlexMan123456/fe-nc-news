import { useContext, useEffect, useState } from "react"
import { updateCommentVoteCount } from "../../../../api"
import { UserContext } from "../../../../contexts/UserContext"

function CommentCard(props){
    const {comment_id, author, body, created_at, votes} = props
    const [currentVoteCount, setCurrentVoteCount] = useState(votes)
    const {signedInUser} = useContext(UserContext)
    const [error, setError] = useState("")
    return (<div className="comment">
        <label key={`comment-${comment_id}-author`} className="comment-author-label">Author: {author}</label>
        <label key={`comment-${comment_id}-created-at`} className="comment-created-at-label">Created at {created_at}</label>
        <p key={`comment-${comment_id}-body`} className="comment-body-label">{body}</p>
        <label key={`comment-${comment_id}-votes`} className="comment-votes-label">Votes: {currentVoteCount}</label>
        <button key={`comment-${comment_id}-vote-button`} className="comment-vote-button" onClick={handleClick} disabled={signedInUser ? false : true}>{signedInUser ? "Vote for this comment" : "Sign in to vote"}</button>
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