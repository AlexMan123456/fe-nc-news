import { Route, Routes } from "react-router-dom"
import ArticlesList from "../components/articles/ArticlesList"
import Homepage from "../components/Homepage"
import Navigation from "../components/Navigation"

function App() {
  return (<>
    <h1>NC News</h1>
    <Navigation/>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/articles" element={<ArticlesList/>}/>
    </Routes>
  </>)
}

export default App
