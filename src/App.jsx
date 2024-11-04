import { Route, Routes } from "react-router-dom"
import ArticlesList from "../components/articles/ArticlesList"
import Homepage from "../components/Homepage"
import Navigation from "../components/Navigation"
import ArticlePage from "../components/articles/individual-article/ArticlePage"

function App() {
  return (<>
    <h1>NC News</h1>
    <Navigation/>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/articles" element={<ArticlesList/>}/>
      <Route path="/articles/:article_id" element={<ArticlePage/>}/>
    </Routes>
  </>)
}

export default App
