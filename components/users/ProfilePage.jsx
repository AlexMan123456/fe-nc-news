import { useEffect, useState } from "react"
import { getUserByUsername } from "../../api.js"
import { useParams } from "react-router-dom"

function ProfilePage(props){
    const {username} = useParams()
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")
    
    useEffect(() => {
        setIsLoading(true)
        getUserByUsername(username).then((user) => {
            setIsLoading(false)
            setUser(user)
        }).catch((err) => {
            setIsLoading(false)
            setError("Could not load user")
        })
    }, [])

    if(isLoading){
        return <p>Now loading...</p>
    }

    if(error){
        return <p>{error}</p>
    }

    return (<section>
        <h2>{user.username}</h2>
        <p>{user.name}</p>
        <img src={user.avatar_url} alt={`Profile picture for ${user.username}`}/>
        <h3>Articles</h3>
    </section>)
}

export default ProfilePage