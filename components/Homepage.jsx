import welcomeImage from "../images/welcome-image.jpeg"

function Homepage(){
    return (<div id="homepage">
        <h2>Welcome to NC News!</h2>
        <img src={welcomeImage} alt="A wooden surface with newspaper, teacup, notebook, and a portion of a pair of glasses on the right"/>
    </div>)
}

export default Homepage