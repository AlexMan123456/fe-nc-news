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
        return data.data.comments
    })
}

export { getArticles, getArticleById, getCommentsByArticleId }