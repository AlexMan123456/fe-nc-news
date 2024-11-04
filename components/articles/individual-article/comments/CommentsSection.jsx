import CommentAdder from "./CommentAdder"
import CommentsList from "./CommentsList"

function CommentsSection(props){
    
    return (<div id="comments-section">
        <CommentAdder/>
        <CommentsList articleID={props.articleID}/>
    </div>)
}

export default CommentsSection