import { Link } from "react-router-dom"

function ArticleCard(props){
    const {article_id, title, author, image, created_at, votes, comment_count, topic} = props
    return (<div id="article-card">
        <img className="article-image" key={`article-${article_id}-image`} src={image} alt={`cover image for article '${title}' by ${author}`}/>
        <br></br>
        <Link to={`/articles/${article_id}`} key={`article-${article_id}-title`}>{title}</Link>
        <br></br>
        <label htmlFor={`article-${article_id}-topic`} key={`article-${article_id}-label`}>Topic:</label>
            <Link key={`article-${article_id}-topic`} id={`article-${article_id}-topic`}>{topic}</Link>
        <br></br>
        <label key={`article-${article_id}-author`}>Created by {author} on {created_at}</label>
        <label key={`article-${article_id}-votes`}>Votes: {votes}</label>
        <label key={`article-${article_id}-comment-count`}>Comments: {comment_count}</label>
    </div>)
}

export default ArticleCard