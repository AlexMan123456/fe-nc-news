import { useContext, useState } from "react"
import { deleteComment, updateCommentVoteCount } from "../../../../api"
import { UserContext } from "../../../../contexts/UserContext"
import formatDateAndTime from "../../../../utils/format-date-and-time"

function CommentCard(props){
    const {setComments} = props
    const {comment_id, author, body, created_at, votes} = props.comment
    const {date, time} = formatDateAndTime(created_at)
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
            key={`comment-${comment_id}-author-and-created-at`}
            className="comment-author-label-and-created-at">
                    Comment by: <strong>{author}</strong> || <em>{date}</em> at <em>{time}</em>
        </legend>
        <p
            key={`comment-${comment_id}-body`} 
            className="comment-body-label">
                {body}
        </p>
        <div className="comment-buttons-and-vote-count">
            <p 
                key={`comment-${comment_id}-votes`} 
                className="comment-votes-label">
                    Votes: {currentVoteCount}
            </p>
            <button 
                key={`comment-${comment_id}-vote-button`} 
                className="comment-vote-button" 
                onClick={handleVotes} 
                disabled={signedInUser ? false : true}
                aria-label={votedForComment ? `Remove vote from ${author}'s comment` :`Vote for ${author}'s comment`}>
                    {signedInUser ? (votedForComment ? "Remove vote" : "Vote") : "Sign in to vote"}
            </button>
            {author === signedInUser ? 
                <button 
                key={`comment-${comment_id}-delete-button`} 
                onClick={handleDelete}
                aria-label="Delete comment">
                        Delete
                </button> 
            : null}
        </div>
        <p>{voteError ? voteError : null}</p>
        <p>{deleteError ? deleteError : null}</p>
    </fieldset>)
    
}

export default CommentCard