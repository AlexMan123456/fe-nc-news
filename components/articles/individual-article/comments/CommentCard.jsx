import { useContext, useState } from "react"
import { deleteComment, updateCommentVoteCount } from "../../../../api.js"
import { UserContext } from "../../../../contexts/UserContext.jsx"
import formatDateAndTime from "../../../../utils/format-date-and-time.js"
import VoteButtons from "../../../vote-buttons/VoteButtons.jsx"

function CommentCard(props){
    const {setComments} = props
    const {comment_id, author, body, created_at, votes} = props.comment
    const {date, time} = formatDateAndTime(created_at)
    const [currentVoteCount, setCurrentVoteCount] = useState(votes)
    const {signedInUser} = useContext(UserContext)
    const [voteError, setVoteError] = useState("")
    const [deleteError, setDeleteError] = useState("")

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
        {body.split("\n").map((paragraph, index) => {
            return <p key={`comment-${comment_id}-body-paragraph-${index}`}>{paragraph}</p>
        })}
        <div className="comment-buttons-and-vote-count">
            <p 
                key={`comment-${comment_id}-votes`} 
                className="comment-votes-label">
                    Votes: {currentVoteCount}
            </p>
            <div className="comment-vote-buttons">
                <VoteButtons contents={props.comment} setCurrentVoteCount={setCurrentVoteCount} setError={setVoteError}/>
            </div>
            {author === signedInUser ? 
                <button 
                key={`comment-${comment_id}-delete-button`} 
                className="delete-comment-button"
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