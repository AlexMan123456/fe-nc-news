import { useContext, useEffect, useState } from "react"
import CommentAdder from "./CommentAdder.jsx"
import CommentsList from "./CommentsList.jsx"
import { UserContext } from "../../../../contexts/UserContext.jsx"
import { Link, useLocation, useSearchParams } from "react-router-dom"
import { getCommentsByArticleId } from "../../../../api.js"
import setQuery from "../../../../utils/set-query.js"

function CommentsSection(props){
    const location = useLocation()
    const [comments, setComments] = useState([])
    const {signedInUser} = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const p = searchParams.get("p")
    useEffect(() => {
        setIsLoading(true)
        getCommentsByArticleId(props.articleID, {p}).then((comments) => {
            setIsLoading(false)
            setError("")
            setComments(comments)
        }).catch((err) => {
            setIsLoading(false)
            setError("ERROR: Could not fetch comments. Please try again later.")
        })
    }, [searchParams])
    return (<>
        <h3>Comments</h3>
        <div id="comments-area">
            {comments.length === 0 ? 
            <section>
                <h4>There are no comments on this page!</h4>
                <Link to={`${setQuery(location.search, "p", 1)}`}>Return to page 1</Link>
            </section>
            :
            <>
            {signedInUser ? <CommentAdder articleID={props.articleID} setComments={setComments}/> : <label>Please sign in to post a comment</label>}
            <br></br>
            <CommentsList comments={comments} setComments={setComments} isLoading={isLoading} error={error}/>
            </>}
        </div>
    </>)
}

export default CommentsSection