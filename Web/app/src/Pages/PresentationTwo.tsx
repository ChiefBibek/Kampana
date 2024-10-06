import { Link } from "react-router-dom"; 
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io"; 
import { motion } from "framer-motion";

const PresentationTwo = () => { 
  // Animation variants for the cards
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0, 
      transition: { duration: 0.5 } 
    },
  };

  return (
    <section className="bg-slide2 min-h-screen relative flex flex-col justify-center items-center p-6 space-y-10">
      {/* Marsquakes Card */}
      <motion.div 
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
        className="bg-white bg-opacity-80 rounded-lg shadow-lg p-4 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-2">Marsquakes</h2>
        <p>Mars, the red planet, experiences its own unique seismic events known as "marsquakes." These quakes provide clues about the planet's interior composition and tectonic activity.</p>
      </motion.div>

      {/* Dust Storms Card */}
      <motion.div 
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.4 }}
        className="bg-white bg-opacity-80 rounded-lg shadow-lg p-4 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-2">Dust Storms</h2>
        <p>Powerful dust storms on Mars can also generate seismic signals, which scientists analyze to understand the planet's atmosphere and surface processes.</p>
      </motion.div>

      {/* Magnetic Field Card */}
      <motion.div 
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.6 }}
        className="bg-white bg-opacity-80 rounded-lg shadow-lg p-4 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-2">Magnetic Field</h2>
        <p>Seismic data from Mars helps reveal the planet's weak and irregular magnetic field, which differs significantly from Earth's global magnetic field.</p>
      </motion.div>

      {/* Navigation Buttons */}
      <Link to="/presentation" className="absolute bottom-5 left-5"> 
        <button className="bg-white bg-opacity-80 rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-opacity-100 transition duration-200"> 
          <IoIosArrowBack size={24} color="#000" /> 
        </button> 
      </Link> 
    
      <Link to="/presentationthree" className="absolute bottom-5 right-5"> 
        <button className="bg-white bg-opacity-80 rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-opacity-100 transition duration-200"> 
          <IoIosArrowForward size={24} color="#000" /> 
        </button> 
      </Link> 
    </section>
  );
}; 

export default PresentationTwo;
