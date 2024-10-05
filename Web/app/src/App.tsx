import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage"
import EventDetection from "./Pages/EventDetection"
import Resources from "./Pages/Resources"
import Layout from "./Components/Layout"
import MarsDetails from "./Pages/MarsDetails"
import MoonDetails from "./Pages/MoonDetails"
import About from "./Pages/About"

const App = () => {
  return (
<BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/event-detection" element={<EventDetection />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/about" element={<About />} />
          <Route path="/event-detection/moon" element={<MoonDetails/>} /> 
          <Route path="/event-detection/mars" element={<MarsDetails />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App