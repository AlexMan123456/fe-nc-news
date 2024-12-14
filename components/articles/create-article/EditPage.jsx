import { useEffect, useRef, useState } from "react"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { getAllTopics } from "../../../api.js"

function EditPage(props){
    const {title, setTitle, body, setBody, topic, setTopic, image, setImage, setIsPreviewPage} = props
    const [allTopics, setAllTopics] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [topicError, setTopicError] = useState("")
    const [imageError, setImageError] = useState("")
    const articleTextboxRef = useRef(0)
    
    useEffect(() => {
        setIsLoading(true)
        getAllTopics().then((topics) => {
            setIsLoading(false)
            setAllTopics(topics)
        }).catch((err) => {
            setTopicError("An error has occured. Please try again later.")
        })
    }, [])

    
    function handleSubmit(event){
        event.preventDefault()
        setIsPreviewPage(true)
    }

    function handleArticleBody(event){
        setBody(event.target.value)

        if(articleTextboxRef.current.scrollHeight > 104){
            articleTextboxRef.current.style.height = "auto"
            articleTextboxRef.current.style.height = `${articleTextboxRef.current.scrollHeight}px`
        } else if(articleTextboxRef.current.scrollHeight < 104) {
            articleTextboxRef.current.style.height = "auto"
            articleTextboxRef.current.style.height = `100px`
        }
    }

    function handleImage(event){
        event.preventDefault()
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(event.target.files[0])
            reader.onload = () => {
                resolve(reader.result)
            }
            reader.onerror = (err) => {
                reject(err)
            }
        }).then((base64URL) => {
            setImage(base64URL)
        }).catch((err) => {
            setImageError(err)
        })
    }

    if(isLoading){
        return <p>Now loading...</p>
    }

    if(topicError){
        return <p>{topicError}</p>
    }

    return (<form id="article-creator" onSubmit={handleSubmit}>
        <div id="article-title-setter">
            <label htmlFor="article-title-textbox">Title:</label>
                <input
                    id="article-title-textbox"
                    type="text"
                    value={title}
                    onChange={(event) => {setTitle(event.target.value)}}
                ></input>
        </div>
        <input type="file" onChange={handleImage}/>
        {image ? <img src={image} alt="Your chosen image"/> : <p>{imageError}</p>}
        <div id="article-body-setter">
            <label htmlFor="article-body-textbox">Body:</label>
                <textarea 
                    id="article-body-textbox"
                    ref={articleTextboxRef}
                    value={body}
                    onChange={handleArticleBody}
                ></textarea>
        </div>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id="article-topic-dropdown-label">Topic</InputLabel>
            <Select
                labelId="article-topic-dropdown-label"
                id="article-topic-dropdown"
                value={topic}
                onChange={(event) => {setTopic(event.target.value)}}
                label="Topic">
                    {allTopics.map((topic) => {
                        return <MenuItem key={`${topic.slug}-menu-item`} value={topic.slug}>{topic.slug}</MenuItem>
                    })}
            </Select>
        </FormControl>
        <br></br>
        <input type="submit" value="View in preview mode"></input>
    </form>)
}

export default EditPage