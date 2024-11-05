import { useContext } from "react"
import { UserContext } from "../../../../contexts/UserContext"

function CommentAdder(){
    const {signedInUser} = useContext(UserContext)
    console.log(signedInUser)
    return (<form>
        <label for="comment-textbox">Add a comment here:</label>
        <input id="comment-textbox" type="text"></input>
        <input type="submit"></input>
    </form>)
}

export default CommentAdder