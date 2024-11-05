import { useEffect, useState } from "react"
import { getAllArticles, getArticlesByTopic } from "../../api.js"
import ArticleCard from "./ArticleCard.jsx"
import { useSearchParams } from "react-router-dom"
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material"

function ArticlesList(){
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const [sortBy, setSortBy] = useState("date")
    const [order, setOrder] = useState("ascending")
    const topicQuery = searchParams.get("topic")
    useEffect(() => {
        setIsLoading(true)
        const apiRequest = topicQuery ? getArticlesByTopic(topicQuery) : getAllArticles()
        apiRequest.then((articles) => {
            setIsLoading(false)
            setError("")
            setArticles(articles)
        }).catch((err) => {
            setIsLoading(false)
            setError("ERROR: Could not fetch articles. Please try again later.")
        })
    }, [])
    if(isLoading){
        return <p>Now loading...</p>
    }
    if(error){
        return <p>{error}</p>
    }
    return (<>
        <FormControl>
            <FormLabel id="sort-by-label">Sort by:</FormLabel>
            <RadioGroup aria-labelledby="sort-by-label" name="sort-by-radio-buttons" value={sortBy} onChange={(event) => {setSortBy(event.target.value)}} row>
                <FormControlLabel value="date" control={<Radio/>} label="Date (default)"/>
                <FormControlLabel value="comment_count" control={<Radio/>} label="Comment count"/>
                <FormControlLabel value="votes" control={<Radio/>} label="Votes"/>
            </RadioGroup>
        </FormControl>
        <br></br>
        <FormControl>
            <FormLabel id="order-label">Order:</FormLabel>
            <RadioGroup aria-labelledby="order-label" name="order-radio-buttons" value={order} onChange={(event) => {setOrder(event.target.value)}} row>
                <FormControlLabel value="ascending" control={<Radio/>} label="Ascending"/>
                <FormControlLabel value="descending" control={<Radio/>} label="Descending"/>
            </RadioGroup>
        </FormControl>
        <div id="articles-list">
            {articles.map((article) => {
                return <ArticleCard key={`article-${article.article_id}`} article_id={article.article_id} title={article.title} author={article.author} created_at={article.created_at} image={article.article_img_url} topic={article.topic} votes={article.votes} comment_count={article.comment_count}/>
            })}
        </div>
    </>)
}

export default ArticlesList