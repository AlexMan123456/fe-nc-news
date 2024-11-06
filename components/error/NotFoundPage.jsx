import { Link } from "react-router-dom"

function NotFoundPage(){
    return (<>
        <h2>404: Page Not Found</h2>
        <p>The page you are looking for does not exist</p>
        <Link to="/">Return to homepage</Link>
    </>)
}

export default NotFoundPage