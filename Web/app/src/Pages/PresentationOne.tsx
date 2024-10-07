import { IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PresentationOne = () => {
  return (
    <section className='min-h-screen flex flex-col justify-center items-center text-center p-5 bg-slide1'>
      {/* Title with gradient background and animation */}
      <motion.h1 
        className='text-4xl md:text-5xl font-bold mb-4  text-white z-10  p-2 rounded-lg' // Adjusted gradient background opacity
        initial={{ opacity: 0, y: -50 }} // Start off-screen and invisible
        animate={{ opacity: 1, y: 0 }} // Animate to visible and on-screen
        transition={{ duration: 0.8 }} // Duration of the animation
      >
        Seismic Detection Across the Solar System
      </motion.h1>

      {/* Description with gradient background and animation */}
      <motion.p 
        className='text-lg md:text-xl max-w-2xl mb-8 text-white z-10 pt-11 rounded-lg' // Adjusted gradient background opacity
        initial={{ opacity: 0, y: 20 }} // Start slightly below and invisible
        animate={{ opacity: 1, y: 0 }} // Animate to visible and on-screen
        transition={{ duration: 0.8, delay: 0.3 }} // Delay the description animation
      >
        Seismic activity on planets and moons holds valuable insights into the formation and evolution of our solar system. By studying quakes and vibrations across celestial bodies, scientists can unravel the mysteries of their internal structures and geological processes.
      </motion.p>

      {/* Next Button */}
      <Link to="/presentationtwo" className="absolute bottom-5 right-5 z-10"> 
        <button className="bg-white bg-opacity-80 rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-opacity-100 transition duration-200"> 
          <IoIosArrowForward size={24} color="#000" /> 
        </button> 
      </Link> 
    </section>
  );
};

export default PresentationOne;
