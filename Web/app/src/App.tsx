import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage"
import EventDetection from "./Pages/EventDetection"
import Resources from "./Pages/Resources"
import About from "./Pages/About"
import Layout from "./Components/Layout"

const App = () => {
  return (
<BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/event-detection" element={<EventDetection />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App