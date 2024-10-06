import BriefOverview from "../Components/BriefOverview"
import Explain from "../Components/Explain"
import Footer from "../Components/Footer"
import HeroSection from "../Components/HeroSection"

const HomePage = () => {
  return (
    <section>
        <HeroSection/>
        <BriefOverview/>
        {/* <Explain/> */}
        <Footer/>
    </section>
  )
}

export default HomePage