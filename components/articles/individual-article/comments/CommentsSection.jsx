import { useContext, useState } from "react"
import CommentAdder from "./CommentAdder"
import CommentsList from "./CommentsList"
import { UserContext } from "../../../../contexts/UserContext"

function CommentsSection(props){
    const [comments, setComments] = useState([])
    const {signedInUser} = useContext(UserContext)
    return (<div id="comments-section">
        {signedInUser ? <CommentAdder articleID={props.articleID} setComments={setComments}/> : <label>Please sign in to post a comment</label>}
        <br></br>
        <CommentsList articleID={props.articleID} comments={comments} setComments={setComments}/>
    </div>)
}

export default CommentsSection