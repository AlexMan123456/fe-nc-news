import { useContext, useState } from "react"
import { updateArticleVoteCount } from "../../../api.js"
import { UserContext } from "../../../contexts/UserContext.jsx"
import formatDateAndTime from "../../../utils/format-date-and-time.js"
import VoteButtons from "../../vote-buttons/VoteButtons.jsx"

function ArticleContents(props){
    const {title, author, article_img_url: image, body, created_at} = props.article
    const {currentVoteCount} = props
    const {date, time} = formatDateAndTime(created_at)
    return (<>
        <article>
            <div id="article-details">
                <h2>{title}</h2>
                <p>By: {author}</p>
                <img src={image} alt={`cover image for '${title}' by ${author}`}/>
            </div>
            <section id="article-contents-body">
                {body.split("\n").map((paragraph, index) => {
                    return <p key={`article-${props.article.article_id}-paragraph-${index}`}>{paragraph}</p>
                })}
            </section>
        </article>
        <br></br>
        <div id="individual-article-stats">
            <p id="individual-article-votes" aria-label={`Votes: ${currentVoteCount}.`}>Votes: {currentVoteCount}</p>
            <p id="individual-article-created-at">Created on <em>{date}</em> at <em>{time}</em></p>
        </div>
    </>)
}

export default ArticleContents