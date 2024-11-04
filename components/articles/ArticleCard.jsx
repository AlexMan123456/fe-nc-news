import { Link } from "react-router-dom"

function ArticleCard(props){
    return (<>
        <img className="article-image" key={`article-${props.article_id}-image`} src={props.image} alt={`cover image for article '${props.title}' by ${props.author}`}/>
        <Link to={`/articles/${props.article_id}`} key={`article-${props.article_id}-title`}>{props.title}</Link>
        <p key={`article-${props.article_id}-author`}>Created by {props.author} on {props.created_at}</p>
        <p key={`article-${props.article_id}-votes`}>Votes: {props.votes}</p>
        <p key={`article-${props.article_id}-comment-count`}>Comments: {props.comment_count}</p>
    </>)
}

export default ArticleCard