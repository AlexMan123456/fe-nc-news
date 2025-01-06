import { useContext, useState } from "react"
import { deleteComment, updateCommentVoteCount } from "../../../../api.js"
import { UserContext } from "../../../../contexts/UserContext.jsx"
import formatDateAndTime from "../../../../utils/format-date-and-time.js"
import VoteButtons from "../../../buttons/VoteButtons.jsx"
import DeleteButton from "../../../buttons/DeleteButton.jsx"

function CommentCard(props){
    const {setComments} = props
    const {comment_id, author, body, created_at, votes} = props.comment
    const {date, time} = formatDateAndTime(created_at)
    const [currentVoteCount, setCurrentVoteCount] = useState(votes)
    const {signedInUser} = useContext(UserContext)
    const [voteError, setVoteError] = useState("")

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
                <DeleteButton
                    key={`comment-${comment_id}-delete-button`}
                    contents={props.comment}
                    setContents={setComments}/> 
            : null}
        </div>
        <p>{voteError}</p>
    </fieldset>)
    
}

export default CommentCard