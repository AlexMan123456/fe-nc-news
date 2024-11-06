import { useContext, useState } from "react"
import { deleteComment, updateCommentVoteCount } from "../../../../api"
import { UserContext } from "../../../../contexts/UserContext"

function CommentCard(props){
    const {setComments} = props
    const {comment_id, author, body, created_at, votes} = props.comment
    const [currentVoteCount, setCurrentVoteCount] = useState(votes)
    const [votedForComment, setVotedForComment] = useState(false)
    const {signedInUser} = useContext(UserContext)
    const [voteError, setVoteError] = useState("")
    const [deleteError, setDeleteError] = useState("")

    function handleVotes(event){
        event.preventDefault()
        setVotedForComment((voted) => {
            return !voted
        })
        setCurrentVoteCount((currentVoteCount) => {
            return votedForComment ? currentVoteCount - 1 : currentVoteCount + 1
        })
        updateCommentVoteCount(comment_id).catch((err) => {
            setVoteError(`Your vote could not be ${votedForComment ? "removed" : "added"}. Please try again later.`)
            event.target.disabled = true
            setCurrentVoteCount((currentVoteCount) => {
                return votedForComment ? currentVoteCount + 1 : currentVoteCount - 1
            })
            setTimeout(() => {
                event.target.disabled = false
                setVoteError("")
            }, 5000)
        })
    }

    function handleDelete(event){
        event.preventDefault()
        deleteComment(comment_id).then(() => {
            setComments((currentComments) => {
                const existingComments = [...currentComments]
                for(const index in existingComments){
                    if(currentComments[index].comment_id === comment_id){
                        existingComments.splice(index, 1)
                        break
                    }
                }
                return existingComments
            })
        }).catch((err) => {
            setDeleteError("Your comment could not be deleted. Please try again later.")
            event.target.disabled = true
            setTimeout(() => {
                event.target.disabled = false
                setDeleteError("")
            }, 5000)
        })
    }

    return (<fieldset className="comment">
        <legend 
            key={`comment-${comment_id}-author`}
            className="comment-author-label">
                    Author: {author}
        </legend>
        <label 
            key={`comment-${comment_id}-created-at`} 
            className="comment-created-at-label">
                Created at {created_at}
        </label>
        <p
            key={`comment-${comment_id}-body`} 
            className="comment-body-label">
                {body}
        </p>
        <label 
            key={`comment-${comment_id}-votes`} 
            className="comment-votes-label">
                Votes: {currentVoteCount}
        </label>
        <button 
            key={`comment-${comment_id}-vote-button`} 
            className="comment-vote-button" 
            onClick={handleVotes} 
            disabled={signedInUser ? false : true}>
                {signedInUser ? (votedForComment ? "Remove vote" : "Vote for this comment") : "Sign in to vote"}
        </button>
        <label>{voteError ? voteError : null}</label>
        {author === signedInUser ? 
            <button 
                key={`comment-${comment_id}-delete-button`} 
                onClick={handleDelete}>
                    Delete comment
            </button> 
        : null}
        <label>{deleteError ? deleteError : null}</label>
    </fieldset>)
    
}

export default CommentCard