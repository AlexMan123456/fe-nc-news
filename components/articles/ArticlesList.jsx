

import SortByRadioGroup from "./SortByRadioGroup.jsx"
import OrderRadioGroup from "./OrderRadioGroup.jsx"
import ArticlesPage from "./ArticlesPage.jsx"

function ArticlesList(){
    
    return (<>
        <SortByRadioGroup/>
        <br></br>
        <OrderRadioGroup/>
        <br></br>
        <ArticlesPage/>
        
    </>)
}

export default ArticlesList