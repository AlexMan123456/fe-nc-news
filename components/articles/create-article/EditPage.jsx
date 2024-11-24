import { useContext, useState } from "react"
import { UserContext } from "../../../contexts/UserContext.jsx"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"

function EditPage(){
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [image, setImage] = useState("")
    const [searchParams, setSearchParams] = useSearchParams()
    const {signedInUser} = useContext(UserContext)
    const location = useLocation()
    const navigate = useNavigate()

    function handleSubmit(event){
        event.preventDefault()
        searchParams.set("title", title)
        searchParams.set("author", signedInUser)
        searchParams.set("body", body)
        searchParams.set("created_at", new Date().toISOString())
        
        navigate(`${location.pathname}/preview?${searchParams.toString()}`)
    }

    return (<form onSubmit={handleSubmit}>
        <label htmlFor="article-title-textbox">Title:</label>
            <input
                id="article-title-textbox" 
                type="text"
                value={title}
                onChange={(event) => {setTitle(event.target.value)}}
            ></input>
        <label htmlFor="article-body-textbox">Body:</label>
            <textarea 
                id="article-body-textbox"
                value={body}
                onChange={(event) => {setBody(event.target.value)}}
            ></textarea>
        <input type="submit" value="View in preview mode"></input>
    </form>)
}

export default EditPage