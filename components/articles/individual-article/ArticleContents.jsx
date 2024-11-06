import { useContext, useState } from "react"
import { updateArticleVoteCount } from "../../../api.js"
import { UserContext } from "../../../contexts/UserContext.jsx"

function ArticleContents(props){
    const {article_id, title, author, article_img_url: image, body, created_at, votes} = props.article
    const [currentVoteCount, setCurrentVoteCount] = useState(votes)
    const [votedForArticle, setVotedForArticle] = useState(false)
    const [error, setError] = useState(false)
    const {signedInUser} = useContext(UserContext)
    function handleClick(event){
        event.preventDefault()
        setVotedForArticle((voted) => {
            return !voted
        })
        setCurrentVoteCount((currentVoteCount) => {
            return votedForArticle ? currentVoteCount - 1 : currentVoteCount + 1
        })
        updateArticleVoteCount(article_id, votedForArticle ? false : true).catch((err) => {
            setError(`Your vote could not be ${votedForArticle ? "removed" : "added"}. Please try again later.`)
            event.target.disabled = true
            setCurrentVoteCount((currentVoteCount) => {
                return votedForArticle ? currentVoteCount + 1 : currentVoteCount - 1
            })
            setTimeout(() => {
                event.target.disabled = false
                setError("")
            }, 5000)
        })
    }
    return (<>
        <h2 id="article-contents-header">{title}</h2>
        <img id="article-contents-image" src={image} alt={`cover image for '${title}' by ${author}`}/>
        <section id="article-contents-body">{body}</section>
        <br></br>
        <label id="article-contents-votes">Votes: {currentVoteCount}</label>
        <label id="article-contents-created-at">Created at: {created_at}</label>
        <button 
            onClick={handleClick} 
            disabled={signedInUser ? false : true}>
                {signedInUser ? 
                    (votedForArticle ? "Remove vote" : "Vote for this article") 
                : "Sign in to vote"}
        </button>
        <label>{error ? error : null}</label>
    </>)
}

export default ArticleContents