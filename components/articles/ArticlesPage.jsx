import SortByRadioGroup from "./SortByRadioGroup.jsx"
import OrderRadioGroup from "./OrderRadioGroup.jsx"
import ArticlesList from "./ArticlesList.jsx"
import ArticlesQueryLabels from "./ArticlesQueryLabels.jsx"
import LimitSetter from "../pagination/LimitSetter.jsx"
import { Link } from "react-router-dom"

function ArticlesPage(){

    return (<>
        <SortByRadioGroup/>
        <br></br>
        <OrderRadioGroup/>
        <br></br>
        <ArticlesQueryLabels/>
        <LimitSetter/>
        <Link to="/articles/create">Create article</Link>
        <ArticlesList/>
    </>)
}

export default ArticlesPage