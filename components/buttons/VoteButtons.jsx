import { useContext, useState } from "react"
import { updateArticleVoteCount, updateCommentVoteCount } from "../../api.js"
import voteInteractionDetails from "../../utils/vote-interaction-details.js"
import { UserContext } from "../../contexts/UserContext.jsx"

function VoteButtons(props){
    const {contents, setCurrentVoteCount, setError} = props
    const contentType = Object.keys(contents).includes("article_id") ? "article" : "comment"
    const [votedStatus, setVotedStatus] = useState("not voted")
    const {signedInUser} = useContext(UserContext)

    function handleClick(event){
        event.preventDefault()
        const {increment} = voteInteractionDetails(votedStatus, event.target.className.split("-")[0])
        setVotedStatus((currentVotedStatus) => {
            return voteInteractionDetails(currentVotedStatus, event.target.className.split("-")[0]).voteStatus
        })
        setCurrentVoteCount((currentVoteCount) => {
            return currentVoteCount + increment
        })
        const apiCall = contentType === "article" ? updateArticleVoteCount(contents.article_id, increment) : updateCommentVoteCount(contents.comment_id, increment)
        apiCall.catch((err) => {
            setError(`Your vote could not be adjusted. Please try again later.`)
            event.target.disabled = true
            setCurrentVoteCount((currentVoteCount) => {
                return currentVoteCount - increment
            })
            setTimeout(() => {
                event.target.disabled = false
                setError("")
            }, 5000)
        })
    }
    
    return (<div className="vote-button-group">
        <button 
            className={`upvote-button${votedStatus === "upvoted" ? "-voted" : null}`}
            onClick={handleClick}
            disabled={signedInUser ? false : true}
            aria-label={votedStatus === "upvoted" ? `Remove your upvote from ${contentType}` : `Upvote ${contentType}`}>
                {signedInUser ? "Upvote" : "Sign in to upvote"}
        </button>
        <button 
            className={`downvote-button${votedStatus === "downvoted" ? "-voted" : null}`}
            onClick={handleClick}
            disabled={signedInUser ? false : true}
            aria-label={votedStatus === "downvoted" ? `Remove your downvote from ${contentType}` : `Downvote ${contentType}`}>
                {signedInUser ? "Downvote" : "Sign in to downvote"}
        </button>
    </div>)
}

export default VoteButtons