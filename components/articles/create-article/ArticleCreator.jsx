import { useContext, useState } from "react"
import EditPage from "./EditPage.jsx"
import PreviewPage from "./PreviewPage.jsx"

function ArticleCreator(){
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [image, setImage] = useState("")
    const [isPreviewPage, setIsPreviewPage] = useState(false)

    if(isPreviewPage === false){
        return (<EditPage 
            title={title}
            setTitle={setTitle}
            body={body}
            setBody={setBody}
            image={image}
            setImage={setImage}
            setIsPreviewPage={setIsPreviewPage}
            />)
    }
    return (<PreviewPage
        title={title}
        body={body}
        image={image}
        setIsPreviewPage={setIsPreviewPage}
        />)
}

export default ArticleCreator