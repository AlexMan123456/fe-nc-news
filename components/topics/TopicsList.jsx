import { useEffect, useState } from "react"
import { getAllTopics } from "../../api.js"
import TopicCard from "./TopicCard.jsx"

function TopicsList(){
    const [topics, setTopics] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")
    useEffect(() => {
        setIsLoading(true)
        getAllTopics().then((topics) => {
            setIsLoading(false)
            setError("")
            setTopics(topics)
        }).catch((err) => {
            setError("ERROR: Could not fetch topics. Please try again later.")
        })
    }, [])
    if(isLoading){
        return <label>Now loading...</label>
    }
    if(error){
        return <label>{error}</label>
    }
    return (<div id="topics-list">
        {topics.map((topic) => {
            return <TopicCard key={`${topic.slug}-topic-card`} topic={topic}/>
        })}
    </div>)
}

export default TopicsList