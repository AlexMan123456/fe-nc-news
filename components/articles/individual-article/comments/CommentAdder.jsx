import { useContext, useRef, useState } from "react"
import { UserContext } from "../../../../contexts/UserContext.jsx"
import { postComment } from "../../../../api.js"

function CommentAdder(props){
    const {setComments, articleID} = props
    const {signedInUser} = useContext(UserContext)
    const [commentInput, setCommentInput] = useState("")
    const [error, setError] = useState("")
    const commentTextboxRef = useRef(0)

    function handleTextbox(event){
        setCommentInput(event.target.value)

        if(commentTextboxRef.current.scrollHeight > 104){
            commentTextboxRef.current.style.height = "auto"
            commentTextboxRef.current.style.height = `${commentTextboxRef.current.scrollHeight}px`
        }

    }

    function handleSubmit(event){
        event.preventDefault()
        postComment(articleID, signedInUser, commentInput).then((postedComment) => {
            setComments((currentCommentsList) => {
                const commentsListCopy = [...currentCommentsList]
                commentsListCopy.unshift(postedComment)
                return commentsListCopy
            })
            commentTextboxRef.current.style.height = "100px"
            setCommentInput("")
        }).catch((err) => {
            if(err.response.data.message === "Comment body must not be empty"){
                return setError(err.response.data.message)
            }
            setError("Your comment could not be posted. Please try again later.")
        })
    }
    return (<form id="comment-adder" onSubmit={handleSubmit}>
        <label htmlFor="comment-textbox">Add a comment here:</label>
        <textarea 
            id="comment-textbox" 
            value={commentInput}
            ref={commentTextboxRef}
            onChange={handleTextbox}
        ></textarea>
        <input type="submit"></input>
        {error ? <label>{error}</label> : null}
    </form>)
}

export default CommentAdder