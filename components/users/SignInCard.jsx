import { useContext, useState } from "react"
import { UserContext } from "../../contexts/UserContext"
import { Link } from "react-router-dom"

function SignInCard(props){
    const {username, name, avatar} = props
    const {setSignedInUser} = useContext(UserContext)
    const [isSignInButtonClicked, setIsSignInButtonClicked] = useState(false)
    return <div key={`${username}-card`} className="sign-in-card">
        <img 
            key={`${username}-avatar`} 
            className="sign-in-avatar" 
            src={avatar} 
            alt={`avatar for ${username}`}
        />
        <p 
            key={`${username}-label`}>
                {username} ({name})
        </p>
        <button 
            key={`${username}-sign-in-button`}
            onClick={handleSignIn}
            aria-label={`Sign in as ${username}`}>
                Sign in
        </button>
        <Link to={`/users/${username}`}>View profile</Link>
        <p>{isSignInButtonClicked ? "Signed in successfully" : null}</p>
    </div>
    function handleSignIn(event){
        event.preventDefault()
        setIsSignInButtonClicked(true)
        setSignedInUser(username)
        localStorage.setItem("signedInUser", username)
        setTimeout(() => {
            setIsSignInButtonClicked(false)
        }, 5000)
    }
}

export default SignInCard