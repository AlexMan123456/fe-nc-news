import { useState } from "react"
import { deleteArticle, deleteComment } from "../../api"

function DeleteButton(props){
    const {contents, setContents} = props
    const contentType = contents.article_id ? "article" : "comment"
    const id = contents.article_id ?? contents.comment_id
    const [error, setError] = useState("")

    function handleDelete(event){
        event.preventDefault()
        const apiCall = contentType === "article" ? deleteArticle(contents.article_id) : deleteComment(contents.comment_id)
        apiCall.then(() => {
            setContents((currentContents) => {
                const existingContents = [...currentContents]
                for(const index in existingContents){
                    if(currentContents[index][`${contentType}_id`] === id){
                        existingContents.splice(index, 1)
                        break
                    }
                }
                return existingContents
            })
        }).catch((err) => {
            setError(`Your ${contentType} could not be deleted. Please try again later.`)
            event.target.disabled = true
            setTimeout(() => {
                event.target.disabled = false
                setError("")
            }, 5000)
        })
    }

    return (<>
        <button 
        key={`${contentType}}-${id}-delete-button`} 
        className="delete-button"
        onClick={handleDelete}
        aria-label="Delete comment">
                Delete
        </button>
        <p>{error}</p>
    </>
    )
}

export default DeleteButton