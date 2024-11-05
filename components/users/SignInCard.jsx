import { useContext, useState } from "react"
import { UserContext } from "../../contexts/UserContext"

function SignInCard(props){
    const {username, name, avatar} = props
    const {signedInUser, setSignedInUser} = useContext(UserContext)
    const [isSignInButtonClicked, setIsSignInButtonClicked] = useState(false)
    return <div key={`${username}-card`} className="sign-in-card">
        <img key={`${username}-avatar`} className="sign-in-avatar" src={avatar} alt={`avatar for ${username}`}/>
        <label key={`${username}-label`}>{username} ({name})</label>
        <button key={`${username}-sign-in-button`} onClick={handleSignIn}>Sign in as {username}</button>
        <label>{isSignInButtonClicked ? "Signed in successfully" : null}</label>
    </div>
    function handleSignIn(event){
        event.preventDefault()
        setIsSignInButtonClicked(true)
        setSignedInUser(username)
        setTimeout(() => {
            setIsSignInButtonClicked(false)
        }, 5000)
    }
}

export default SignInCard