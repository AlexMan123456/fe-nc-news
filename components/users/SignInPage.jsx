import { useContext, useEffect, useState } from "react"
import { getAllUsers } from "../../api"
import SignInCard from "./SignInCard"
import { UserContext } from "../../contexts/UserContext.jsx"


function SignInPage(){
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    const {signedInUser, setSignedInUser} = useContext(UserContext)

    function handleSignOut(event){
        event.preventDefault()
        localStorage.setItem("signedInUser", "")
        setSignedInUser("")
    }

    useEffect(() => {
        setIsLoading(true)
        getAllUsers().then((users) => {
            setIsLoading(false)
            setError("")
            setUsers(users)
        }).catch((err) => {
            setIsLoading(false)
            setError("ERROR: Could not fetch users. Please try again later.")
        })
    }, [])

    if(isLoading){
        return <p>Now loading...</p>
    }
    if(error){
        return <p>{error}</p>
    }
    return (<>
        <h2>Sign in as:</h2>
        <section id="user-selection">
            {users.map((user) => {
                return <SignInCard key={`${user.username}-sign-in-card`} username={user.username} name={user.name} avatar={user.avatar_url}/>
            })}
        {signedInUser ? <button id="sign-out-button" onClick={handleSignOut}>Sign out</button> : null}
        </section>
    </>)
}

export default SignInPage