import axios from "axios"
const api = axios.create({
    baseURL: "https://northcoders-project-khyr.onrender.com"
})

function getArticles(){
    return api.get("/api/articles").then((data) => {
        return data.data.articles
    })
}

function getArticleById(id){
    return api.get(`/api/articles/${id}`).then((data) => {
        return data.data.article
    })
}

function getCommentsByArticleId(articleID){
    return api.get(`/api/articles/${articleID}/comments`).then((data) => {
        console.log(data)
        return data.data.comments
    })
}

function updateCommentVoteCount(commentID){
    return api.patch(`/api/comments/${commentID}`, {inc_votes: 1}).then((data) => {
        return data.data.comment
    })
}

function getAllUsers(){
    return api.get("/api/users").then((data) => {
        return data.data.users
    })
}

export { getArticles, getArticleById, getCommentsByArticleId, updateCommentVoteCount, getAllUsers }