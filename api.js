import axios from "axios"
const api = axios.create({
    baseURL: "https://northcoders-project-khyr.onrender.com"
})

function getArticles(queries){
    return api.get("/api/articles", {params: {...queries}}).then(({data}) => {
        return data.articles
    })
}

function getArticleById(id){
    return api.get(`/api/articles/${id}`).then(({data}) => {
        return data.article
    })
}

function getCommentsByArticleId(articleID, queries){
    return api.get(`/api/articles/${articleID}/comments`, {params: {...queries}}).then(({data}) => {
        return data.comments
    })
}

function postArticle(article){
    return api.post("/api/articles", article).then(({data}) => {
        return data.postedArticle
    })
}

function updateCommentVoteCount(commentID, increment){
    return api.patch(`/api/comments/${commentID}`, {inc_votes: increment}).then(({data}) => {
        return data.comment
    })
}

function updateArticleVoteCount(articleID, increment){
    return api.patch(`/api/articles/${articleID}`, {inc_votes: increment}).then(({data}) => {
        return data.updatedArticle
    })
}

function getAllUsers(){
    return api.get("/api/users").then(({data}) => {
        return data.users
    })
}

function postComment(articleID, username, body){
    return api.post(`/api/articles/${articleID}/comments`, {username, body}).then(({data}) => {
        return data.comment
    })
}

function deleteComment(commentID){
    return api.delete(`/api/comments/${commentID}`)
}

function getAllTopics(){
    return api.get("/api/topics").then(({data}) => {
        return data.topics
    })
}

function deleteArticle(articleID){
    return api.delete(`/api/articles/${articleID}`)
}

function getUserByUsername(username){
    return api.get(`/api/users/${username}`).then(({data}) => {
        return data.user
    })
}

export { getArticles, getArticleById, getCommentsByArticleId, updateCommentVoteCount, getAllUsers, postComment, updateArticleVoteCount, deleteComment, getAllTopics, postArticle, deleteArticle, getUserByUsername }