import { Link, useLocation, useSearchParams } from "react-router-dom"
import setQuery from "../../utils/set-query.js"

function PageIndicators(){
    const location = useLocation()
    const [searchParams, setSearchParams] = useSearchParams()

    const page = searchParams.get("p") ? Number(searchParams.get("p")) : 1

    return (
        <p className="page-display">
            {page === 1 ? <span>{"<<"}</span> : <Link to={`${location.pathname}${setQuery(location.search, "p", page-1)}`}>{"<<"}</Link>}
            <span> Page {page} </span>
            <Link to={`${location.pathname}${setQuery(location.search, "p", page+1)}`}>{">>"}</Link>
        </p>
    )
}

export default PageIndicators