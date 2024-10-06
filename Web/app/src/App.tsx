import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage"
import EventDetection from "./Pages/EventDetection"
import Resources from "./Pages/Resources"
import Layout from "./Components/Layout"
import MarsDetails from "./Pages/MarsDetails"
import MoonDetails from "./Pages/MoonDetails"
import About from "./Pages/About"
import PresentationThree from "./Pages/PresentationThree"
import MarsDThree from "./Pages/MarsDThree"
import MoonDThree from "./Pages/MoonDThree"
import PresentationTwo from "./Pages/PresentationTwo"
import PresentationFour from "./Pages/PresentationFour"
import PresentationOne from "./Pages/PresentationOne"
import PresentationFive from "./Pages/PresentationFive"
import PresentationSix from "./Pages/PresentationSix"
import PresentationSeven from "./Pages/PresentationSeven"

const App = () => {
  return (
<BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/presentation" element={<PresentationOne />}/>
          <Route path="/presentationtwo" element={<PresentationTwo />}/>
          <Route path="/presentationthree" element={<PresentationThree />}/>
          <Route path="/presentationfour" element={<PresentationFour />}/>
          <Route path="/presentationfive" element={<PresentationFive />}/>
          <Route path="/presentationsix" element={<PresentationSix />}/>
          <Route path="/presentationseven" element={<PresentationSeven />}/>
          <Route path="/event-detection" element={<EventDetection />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/event-detection/moon" element={<MoonDetails/>} /> 
          <Route path="/event-detection/mars" element={<MarsDetails />} /> 
          <Route path="/event-detection/mars/marsdthree" element={<MarsDThree />} /> 
          <Route path="/event-detection/moon/moondthree" element={<MoonDThree />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App