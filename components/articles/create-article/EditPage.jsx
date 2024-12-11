import { useEffect, useRef, useState } from "react"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { getAllTopics } from "../../../api.js"

function EditPage(props){
    const {title, setTitle, body, setBody, topic, setTopic, image, setImage, setIsPreviewPage} = props
    const [allTopics, setAllTopics] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    const articleTextboxRef = useRef(0)
    
    useEffect(() => {
        setIsLoading(true)
        getAllTopics().then((topics) => {
            setIsLoading(false)
            setAllTopics(topics)
        }).catch((err) => {
            setError("An error has occured. Please try again later.")
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
        setImage(URL.createObjectURL(event.target.files[0]))
    }

    if(isLoading){
        return <p>Now loading...</p>
    }

    if(error){
        return <p>{error}</p>
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
        {image ? <img src={image} alt="Your chosen image"/> : null}
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