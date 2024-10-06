import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const moonActivity = [
  {
    title: 'Lunar Quakes',
    description: 'The Moon, despite its seemingly inactive nature, experiences its own seismic events known as "moonquakes" that provide insights into its internal structure.',
  },
  {
    title: 'Tidal Forces',
    description: 'The gravitational pull between the Earth and Moon can trigger moonquakes, especially during the full and new moon phases.',
  },
  {
    title: 'Meteorite Impacts',
    description: 'Meteorite impacts on the lunar surface can also generate seismic vibrations that are detected by sensitive instruments on the Moon.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: index * 0.3, // Increased delay for staggered effect
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  }),
};

const PresentationFive: React.FC = () => {
  return (
    <section className="bg-slide5 min-h-screen flex flex-col items-center justify-center"> 
      {/* Title Card with Dark Blue to Reddish Gradient */}
      <motion.h2
        className="text-3xl font-bold mb-6 text-center p-4 bg-gradient-to-r from-blue-800 to-red-600 text-white rounded-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        Seismic Activity on the Moon
      </motion.h2>

      {/* Moon Activity Cards in Staggered Positioning */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
        {moonActivity.map((activity, index) => (
          <motion.div
            key={index}
            className={`bg-gradient-to-r from-blue-800 to-red-600 rounded-lg shadow-lg p-4 flex flex-col justify-between ${index % 2 === 0 ? 'transform -translate-y-4' : 'transform translate-y-4'}`} // Staggering positions
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={index}
          >
            <h3 className="text-xl font-semibold mb-2 text-white">{activity.title}</h3>
            <p className="text-white">{activity.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Previous Button */}
      <Link to="/presentationfour" className="absolute bottom-5 left-5"> 
        <button className="bg-white bg-opacity-80 rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-opacity-100 transition duration-200"> 
          <IoIosArrowBack size={24} color="#000" /> 
        </button> 
      </Link> 

      {/* Next Button */}
      <Link to="/presentationsix" className="absolute bottom-5 right-5"> 
        <button className="bg-white bg-opacity-80 rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-opacity-100 transition duration-200"> 
          <IoIosArrowForward size={24} color="#000" /> 
        </button> 
      </Link> 
    </section>
  );
}

export default PresentationFive;
