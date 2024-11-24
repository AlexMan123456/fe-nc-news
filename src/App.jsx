import { Route, Routes, Link } from "react-router-dom"
import ArticlesPage from "../components/articles/ArticlesPage.jsx"
import Homepage from "../components/Homepage.jsx"
import Navigation from "../components/Navigation.jsx"
import ArticlePage from "../components/articles/individual-article/ArticlePage.jsx"
import SignInPage from "../components/users/SignInPage.jsx"
import { useContext } from "react"
import { UserContext } from "../contexts/UserContext.jsx"
import TopicsList from "../components/topics/TopicsList.jsx"
import NotFoundPage from "../components/error/NotFoundPage.jsx"
import ArticleCreator from "../components/articles/create-article/ArticleCreator.jsx"
import PreviewPage from "../components/articles/create-article/PreviewPage.jsx"

function App() {
  const {signedInUser} = useContext(UserContext)
  return (<>
    <h1>NC News</h1>
    <Link id="homepage-link" to="/">Homepage</Link>
    <div id="sign-in-details">
      <Link id="sign-in-page-link" to="/users">{signedInUser ? "Change User" : "Sign In"}</Link>
      <br></br>
      {signedInUser ? <p>{`Signed in as ${signedInUser}`}</p> : null}
    </div>
    <Navigation/>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/users" element={<SignInPage/>}/>
      <Route path="/articles" element={<ArticlesPage/>}/>
      <Route path="/articles/create" element={<ArticleCreator/>}/>
      <Route path="/articles/create/preview" element={<PreviewPage/>}/>
      <Route path="/articles/:article_id" element={<ArticlePage/>}/>
      <Route path="/topics" element={<TopicsList/>}></Route>
      <Route path="/*" element={<NotFoundPage/>}/>
    </Routes>
  </>)
}

export default App
