import { useSearchParams } from "react-router-dom"
import ArticleContents from "../individual-article/ArticleContents.jsx"

function PreviewPage(){
    const [searchParams, setSearchParams] = useSearchParams()
    const article = {
        title: searchParams.get("title"),
        body: searchParams.get("body"),
        author: searchParams.get("author"),
        article_img_url: searchParams.get("image") ? searchParams.get("image") : "https://images.pexels.com/photos/97050/pexels-photo-97050.jpeg?w=700&h=700",
        created_at: searchParams.get("created_at")
    }
    console.log(article)
    return <ArticleContents article={article} currentVoteCount={0}/>
}

export default PreviewPage