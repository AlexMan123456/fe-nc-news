import { useContext, useState } from "react"
import { UserContext } from "../../../../contexts/UserContext.jsx"
import { postComment } from "../../../../api.js"

function CommentAdder(props){
    const {setComments, articleID} = props
    const {signedInUser} = useContext(UserContext)
    const [commentTextbox, setCommentTextbox] = useState("")
    return (<form>
        <label for="comment-textbox">Add a comment here:</label>
        <input id="comment-textbox" type="text" onChange={(event) => {setCommentTextbox(event.target.value)}}></input>
        <input type="submit" onClick={handleSubmit}></input>
    </form>)
    function handleSubmit(event){
        event.preventDefault()
        postComment(articleID, signedInUser, commentTextbox).then((postedComment) => {
            setComments((currentCommentsList) => {
                const commentsListCopy = [...currentCommentsList]
                commentsListCopy.unshift(postedComment)
                return commentsListCopy
            })
        })
    }
}

export default CommentAdder