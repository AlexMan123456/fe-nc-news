import SortByRadioGroup from "./SortByRadioGroup.jsx"
import OrderRadioGroup from "./OrderRadioGroup.jsx"
import ArticlesList from "./ArticlesList.jsx"
import ArticlesQueryLabels from "./ArticlesQueryLabels.jsx"
import LimitSetter from "../pagination/LimitSetter.jsx"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../../contexts/UserContext.jsx"

function ArticlesPage(){
    const {signedInUser} = useContext(UserContext)
    return (<>
        <SortByRadioGroup/>
        <br></br>
        <OrderRadioGroup/>
        <br></br>
        <ArticlesQueryLabels/>
        <LimitSetter/>
        {signedInUser ? <Link to="/articles/create">Create article</Link> : null}
        <ArticlesList/>
    </>)
}

export default ArticlesPage