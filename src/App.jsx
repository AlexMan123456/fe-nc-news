import { Route, Routes, Link } from "react-router-dom"
import ArticlesList from "../components/articles/ArticlesList"
import Homepage from "../components/Homepage"
import Navigation from "../components/Navigation"
import ArticlePage from "../components/articles/individual-article/ArticlePage"
import SignInPage from "../components/users/SignInPage"
import { useContext } from "react"
import { UserContext } from "../contexts/UserContext"

function App() {
  const {signedInUser} = useContext(UserContext)
  return (<>
    <h1>NC News</h1>
    <Link id="homepage-link" to="/">Homepage</Link>
    <div id="sign-in-details">
      <Link id="sign-in-page-link" to="/users">{signedInUser ? "Change User" : "Sign In"}</Link>
      <br></br>
      {signedInUser ? <label id="signed-in-as-label">{`Signed in as ${signedInUser}`}</label> : null}
    </div>
    <Navigation/>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/users" element={<SignInPage/>}/>
      <Route path="/articles" element={<ArticlesList/>}/>
      <Route path="/articles/:article_id" element={<ArticlePage/>}/>
    </Routes>
  </>)
}

export default App
