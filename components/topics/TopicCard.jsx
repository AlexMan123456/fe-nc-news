import { Link } from "react-router-dom"
import ArticlesList from "../articles/ArticlesList"

function TopicCard(props){
    const {slug: topic, description} = props.topic
    return (<div className="topic-card">
        <Link className="topic-link" to={`/articles?topic=${topic}`} element={<ArticlesList/>}>{topic}</Link>
        <p key={`${topic}-topic-description`}>{description}</p>
    </div>)
}

export default TopicCard