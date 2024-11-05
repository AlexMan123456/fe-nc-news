function ArticleContents(props){
    const {title, author, image, body, created_at, votes} = props
    return (<>
        <h2 id="article-contents-header">{title}</h2>
        <img id="article-contents-image" src={image} alt={`cover image for '${title}' by ${author}`}/>
        <section id="article-contents-body">{body}</section>
        <br></br>
        <label id="article-contents-votes">Votes: {votes}</label>
        <label id="article-contents-created-at">Created at: {created_at}</label>
    </>)
}

export default ArticleContents