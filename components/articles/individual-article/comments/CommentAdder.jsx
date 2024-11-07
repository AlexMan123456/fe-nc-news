import { useContext, useState } from "react"
import { UserContext } from "../../../../contexts/UserContext.jsx"
import { postComment } from "../../../../api.js"

function CommentAdder(props){
    const {setComments, articleID} = props
    const {signedInUser} = useContext(UserContext)
    const [commentTextbox, setCommentTextbox] = useState("")
    const [error, setError] = useState("")
    function handleSubmit(event){
        event.preventDefault()
        postComment(articleID, signedInUser, commentTextbox).then((postedComment) => {
            setComments((currentCommentsList) => {
                const commentsListCopy = [...currentCommentsList]
                commentsListCopy.unshift(postedComment)
                return commentsListCopy
            })
            setCommentTextbox("")
        }).catch((err) => {
            if(err.response.data.message === "Comment body must not be empty"){
                return setError(err.response.data.message)
            }
            setError("Your comment could not be posted. Please try again later.")
        })
    }
    return (<form id="comment-adder" onSubmit={handleSubmit}>
        <label for="comment-textbox">Add a comment here:</label>
        <textarea 
            id="comment-textbox" 
            value={commentTextbox} 
            onChange={(event) => {setCommentTextbox(event.target.value)}}
        ></textarea>
        <input type="submit"></input>
        {error ? <label>{error}</label> : null}
    </form>)
}

export default CommentAdder