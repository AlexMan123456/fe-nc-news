

import SortByRadioGroup from "./SortByRadioGroup.jsx"
import OrderRadioGroup from "./OrderRadioGroup.jsx"
import ArticlesList from "./ArticlesList.jsx"

function ArticlesPage(){
    return (<>
        <SortByRadioGroup/>
        <br></br>
        <OrderRadioGroup/>
        <br></br>
        <ArticlesList/>
    </>)
}

export default ArticlesPage