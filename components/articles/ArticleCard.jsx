import { Link } from "react-router-dom"
import formatDateAndTime from "../../utils/format-date-and-time"

function ArticleCard(props){
    const {article_id, title, author, article_img_url: image, created_at, votes, comment_count, topic} = props.article
    const {date, time} = formatDateAndTime(created_at)
    return (<div key={`article-${article_id}-card`} className="article-card">
        <img 
            className="article-image" 
            key={`article-${article_id}-image`} 
            src={image} 
            alt={`cover image for article '${title}' by ${author}`}/>
        <br></br>
        <Link 
            to={`/articles/${article_id}`}
            key={`article-${article_id}-title`}
            className="article-link">
                {title}
        </Link>
        <br></br>
        <p 
            aria-label={`Topic: ${topic}`}
            key={`article-${article_id}-topic-label`}>
                Topic:
        </p>
        <Link
            to={`?topic=${topic}`} 
            key={`article-${article_id}-topic`} className="article-card-topic-link">
                {topic}
        </Link>
        <br></br>
        <p 
            key={`article-${article_id}-author`}>
                Created by <strong>{author}</strong> on <em>{date}</em> at <em>{time}</em>
        </p>
        <div id="article-stat-counts">
            <p className="article-stat-count" key={`article-${article_id}-votes`}aria-label={`Votes: ${votes}.`}>Votes: {votes}</p>
            <p className="article-stat-count" key={`article-${article_id}-comment-count`}>Comments: {comment_count}</p>
        </div>
    </div>)
}

export default ArticleCard