function CommentCard(props){
    const {comment_id, author, body, created_at, votes} = props
    return (<div className="comment">
        <label key={`comment-${comment_id}-author`} className="comment-author-label">Author: {author}</label>
        <label key={`comment-${comment_id}-created-at`}>Created at {created_at}</label>
        <p key={`comment-${comment_id}-body`}>{body}</p>
        <label key={`comment-${comment_id}-votes`}>Votes: {votes}</label>
        <button key={`comment-${comment_id}-vote-button`}>Vote for this comment</button>
    </div>)
}

export default CommentCard