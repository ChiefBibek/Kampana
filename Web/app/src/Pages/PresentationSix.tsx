import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { Link } from 'react-router-dom'

const PresentationSix = () => {
  return (
    <section className='bg-slide6 min-h-screen'>
    <Link to="/presentationfive" className="absolute bottom-5 left-5"> 
                   <button className="bg-white bg-opacity-80 rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-opacity-100 transition duration-200"> 
                       <IoIosArrowBack size={24} color="#000" /> 
                   </button> 
               </Link> 
   
               {/* Next Button */}
               <Link to="/presentationseven" className="absolute bottom-5 right-5"> 
                   <button className="bg-white bg-opacity-80 rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-opacity-100 transition duration-200"> 
                       <IoIosArrowForward size={24} color="#000" /> 
                   </button> 
               </Link> 
       </section>  )
}

export default PresentationSix