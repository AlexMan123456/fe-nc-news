import SortByRadioGroup from "./SortByRadioGroup.jsx"
import OrderRadioGroup from "./OrderRadioGroup.jsx"
import ArticlesList from "./ArticlesList.jsx"
import ArticlesQueryLabels from "./ArticlesQueryLabels.jsx"
import LimitSetter from "../pagination/LimitSetter.jsx"

function ArticlesPage(){
    return (<>
        <SortByRadioGroup/>
        <br></br>
        <OrderRadioGroup/>
        <br></br>
        <ArticlesQueryLabels/>
        <LimitSetter/>
        <ArticlesList/>
    </>)
}

export default ArticlesPage