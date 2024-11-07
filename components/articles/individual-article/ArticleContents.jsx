import { useContext, useState } from "react"
import { updateArticleVoteCount } from "../../../api.js"
import { UserContext } from "../../../contexts/UserContext.jsx"
import formatDateAndTime from "../../../utils/format-date-and-time.js"

function ArticleContents(props){
    const {article_id, title, author, article_img_url: image, body, created_at, votes} = props.article
    const {date, time} = formatDateAndTime(created_at)
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
        <article>
            <div id="article-details">
                <h2>{title}</h2>
                <p>By: {author}</p>
                <img src={image} alt={`cover image for '${title}' by ${author}`}/>
            </div>
            <section id="article-contents-body">
                <p>{body}</p>
            </section>
        </article>
        <br></br>
        <div id="individual-article-stats">
            <p id="individual-article-votes" aria-label={`Votes: ${currentVoteCount}.`}>Votes: {currentVoteCount}</p>
            <p id="individual-article-created-at">Created on <em>{date}</em> at <em>{time}</em></p>
        </div>
        <button 
            onClick={handleClick}
            disabled={signedInUser ? false : true}
            aria-label={votedForArticle ? "Remove your vote from article" : "Vote for article"}>
                {signedInUser ? 
                    (votedForArticle ? "Remove vote" : "Vote") 
                : "Sign in to vote"}
        </button>
        <p>{error ? error : null}</p>
    </>)
}

export default ArticleContents