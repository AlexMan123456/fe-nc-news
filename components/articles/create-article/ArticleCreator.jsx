import { useContext, useState } from "react"
import EditPage from "./EditPage.jsx"
import { UserContext } from "../../../contexts/UserContext.jsx"

function ArticleCreator(){
    return <EditPage/>
}

export default ArticleCreator