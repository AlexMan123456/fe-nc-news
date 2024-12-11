import { Link, useNavigate, useSearchParams } from "react-router-dom"
import ArticleContents from "../individual-article/ArticleContents.jsx"
import { UserContext } from "../../../contexts/UserContext.jsx"
import { useContext, useState } from "react"
import { postArticle } from "../../../api.js"

function PreviewPage(props){
    const {title, body, image, topic, setIsPreviewPage} = props
    const {signedInUser} = useContext(UserContext)
    const author = signedInUser
    const created_at = new Date().toISOString()
    const article = {author: signedInUser, title: title, body: body, topic: topic, created_at, article_img_url: image}
    const [isPosting, setIsPosting] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()

    function handleButtonClick(event){
        event.preventDefault()
        setIsPreviewPage(false)
    }

    function handleSubmit(event){
        event.preventDefault()
        setIsPosting(true)
        delete article.created_at
        postArticle(article)
        .then((article) => {
            setIsPosting(false)
            navigate(`/articles/${article.article_id}`)
        }).catch((err) => {
            setIsPosting(false)
            setError("Your article could not be uploaded. Please try again later.")
        })
    }

    if(isPosting){
        return <p>Posting article...</p>
    }

    if(error){
        return <p>{error}</p>
    }

    return (<>
        <ArticleContents article={article} currentVoteCount={0}/>
        <button onClick={handleButtonClick}>Back to edit page</button>
        <button onClick={handleSubmit}>Submit article</button>
    </>)
}

export default PreviewPage