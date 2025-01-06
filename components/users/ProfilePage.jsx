import { useContext, useEffect, useState } from "react"
import { getArticles, getUserByUsername } from "../../api.js"
import { Link, useParams } from "react-router-dom"
import ArticleCard from "../articles/ArticleCard.jsx"
import { UserContext } from "../../contexts/UserContext.jsx"

function ProfilePage(props){
    const {username} = useParams()
    const [user, setUser] = useState({})
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")
    const {signedInUser} = useContext(UserContext)
    
    useEffect(() => {
        setIsLoading(true)
        getUserByUsername(username).then((user) => {
            setUser(user)
            return getArticles({author: user.username})
        }).then((articles) => {
            setIsLoading(false)
            setArticles(articles)
        }).catch((err) => {
            setIsLoading(false)
            setError("Could not load user")
        })
    }, [])

    if(isLoading){
        return <p>Now loading...</p>
    }

    if(error){
        return <p>{error}</p>
    }

    return (<section>
        <h2>{user.username}</h2>
        <p>{user.name}</p>
        <img src={user.avatar_url} alt={`Profile picture for ${user.username}`}/>
        <h3>Articles</h3>
        {signedInUser === user.username ? <Link to="/articles/create">Create article</Link> : null}
        {articles.map((article) => {
            return <ArticleCard key={`article-${article.article_id}`} article={article} setArticles={setArticles}/>
        })}
    </section>)
}

export default ProfilePage