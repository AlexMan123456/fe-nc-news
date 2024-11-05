import { Route, Routes, Link } from "react-router-dom"
import ArticlesList from "../components/articles/ArticlesList"
import Homepage from "../components/Homepage"
import Navigation from "../components/Navigation"
import ArticlePage from "../components/articles/individual-article/ArticlePage"
import SignInPage from "../components/users/SignInPage"

function App() {
  return (<>
    <h1>NC News</h1>
    <Link id="homepage-link" to="/">Homepage</Link>
    <Link id="sign-in-page-link" to="/users">Sign In</Link>
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
