import CommentCard from "./CommentCard.jsx"
import PageIndicators from "../../../pagination/PageIndicators.jsx"

function CommentsList(props){
    const {comments, setComments, isLoading, error} = props
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