import { useState } from "react"
import { Link } from "react-router-dom"

function StyledLink(props){
    const [isHovering, setIsHovering] = useState(false)
    const {children, to, className} = props
    return <Link 
        style={{color: isHovering ? "blueviolet" : "blue", ...styling}} 
        onMouseEnter={() => {setIsHovering(true)}}
        onMouseLeave={() => {setIsHovering(false)}}
        to={to}>{children}</Link>
}

export default StyledLink

