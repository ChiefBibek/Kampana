import { IoIosArrowBack } from 'react-icons/io'
import { Link } from 'react-router-dom'

const PresentationSeven = () => {
  return (
    <section className='bg-slide7 min-h-screen'>
    <Link to="/presentationsix" className="absolute bottom-5 left-5"> 
                   <button className="bg-white bg-opacity-80 rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-opacity-100 transition duration-200"> 
                       <IoIosArrowBack size={24} color="#000" /> 
                   </button> 
               </Link> 

       </section>
  )
}

export default PresentationSeven