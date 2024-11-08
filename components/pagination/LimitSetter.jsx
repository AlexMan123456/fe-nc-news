import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import setQuery from "../../utils/set-query"

function LimitSetter(){
    const [limit, setLimit] = useState(10)
    const location = useLocation()
    const navigate = useNavigate()

    function handleSubmit(event){
        event.preventDefault()
        const queryString = setQuery(location.search, "limit", limit)
        navigate(`${location.pathname}${queryString}`)
    }

    return (<form onSubmit={handleSubmit}>
        <label htmlFor="limit-input">Limit:</label>
            <input type="number" id="limit-input" onChange={(event) => {setLimit(event.target.value)}}></input>
        <input type="submit" value="Change limit"></input>
    </form>)
}

export default LimitSetter