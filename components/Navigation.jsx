import { Link } from "react-router-dom"

function Navigation(){
 return (<nav>
        <Link to="/articles">Articles</Link>
        <Link to="/topics">Topics</Link>
    </nav>)
}

export default Navigation