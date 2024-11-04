function ArticleContents(props){
    const {title, author, image, body, created_at, votes} = props
    return (<>
        <h2>{title}</h2>
        <img src={image} alt={`cover image for '${title}' by ${author}`}/>
        <section>{body}</section>
        <br></br>
        <label>Votes: {votes}</label>
        <label>Created at: {created_at}</label>
    </>)
}

export default ArticleContents