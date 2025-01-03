import axios from "axios"
const api = axios.create({
    baseURL: "https://northcoders-project-khyr.onrender.com"
})

function getArticles(queries){
    return api.get("/api/articles", {params: {...queries}}).then((data) => {
        return data.data.articles
    })
}

function getArticleById(id){
    return api.get(`/api/articles/${id}`).then((data) => {
        return data.data.article
    })
}

function getCommentsByArticleId(articleID, queries){
    return api.get(`/api/articles/${articleID}/comments`, {params: {...queries}}).then((data) => {
        return data.data.comments
    })
}

function postArticle(article){
    return api.post("/api/articles", article).then((data) => {
        return data.data.postedArticle
    })
}

function updateCommentVoteCount(commentID, increment){
    return api.patch(`/api/comments/${commentID}`, {inc_votes: increment}).then((data) => {
        return data.data.comment
    })
}

function updateArticleVoteCount(articleID, increment){
    return api.patch(`/api/articles/${articleID}`, {inc_votes: increment}).then((data) => {
        return data.data.updatedArticle
    })
}

function getAllUsers(){
    return api.get("/api/users").then((data) => {
        return data.data.users
    })
}

function postComment(articleID, username, body){
    return api.post(`/api/articles/${articleID}/comments`, {username, body}).then((data) => {
        return data.data.comment
    })
}

function deleteComment(commentID){
    return api.delete(`/api/comments/${commentID}`)
}

function getAllTopics(){
    return api.get("/api/topics").then((data) => {
        return data.data.topics
    })
}

function deleteArticle(articleID){
    return api.delete(`/api/articles/${articleID}`)
}

export { getArticles, getArticleById, getCommentsByArticleId, updateCommentVoteCount, getAllUsers, postComment, updateArticleVoteCount, deleteComment, getAllTopics, postArticle, deleteArticle }