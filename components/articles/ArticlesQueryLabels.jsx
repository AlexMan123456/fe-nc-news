import displaySortByQuery from "../../utils/display-query.js"
import { useSearchParams } from "react-router-dom"
import getSearchParams from "../../utils/get-search-parameters.js"

function ArticlesQueryLabels(props){
    const [searchParams, setSearchParams] = useSearchParams()
    const {topic, sort_by, order, limit} = getSearchParams(searchParams)
    return (
        <div id="articles-query-labels">
            <p aria-label={`Filtered by topic: ${topic ? topic : "none"}.`}>Filtered by topic: {topic ? topic : "none"}</p>
            <p aria-label={`Sort by: ${sort_by ? displaySortByQuery(sort_by) : "date"}.`}>Sort by: {sort_by ? displaySortByQuery(sort_by) : "date"}</p>
            <p>Order: {order ? order + "ending" : "descending"}</p>
            <p>Limit: {limit ? limit  : 10}</p>
        </div>
    )
}

export default ArticlesQueryLabels