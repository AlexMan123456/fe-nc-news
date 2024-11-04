import axios from "axios"
const api = axios.create({
    baseURL: "https://northcoders-project-khyr.onrender.com"
})

function getArticles(){
    return api.get("/api/articles").then((data) => {
        return data.data.articles
    })
}

export { getArticles }