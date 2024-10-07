import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const quakes = [
  {
    title: 'Magnitude 5 Marsquake',
    description: 'In 2019, the InSight lander detected the largest marsquake yet, with a magnitude of around 5 on the Richter scale.',
  },
  {
    title: 'Dust Storm Quakes',
    description: 'Powerful dust storms on Mars have been observed to generate seismic signals, providing insights into the planet\'s atmospheric dynamics.',
  },
  {
    title: 'Moonquake Influence',
    description: 'The gravitational pull of Mars\' two moons, Phobos and Deimos, can also trigger small quakes on the Martian surface.',
  },
];

const PresentationFour: React.FC = () => {
  return (
    <section className="bg-slide4 min-h-screen relative flex flex-col items-center justify-center"> 
      {/* Title Card with Bluish-Green Gradient */}
      <motion.h2
        className="text-3xl font-bold mb-6 text-center p-4 bg-gradient-to-r from-teal-400 to-cyan-500 text-white rounded-lg absolute top-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        Notable Quakes and Marsquakes
      </motion.h2>

      {/* Quake Cards with Bluish-Green Gradient */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
        {quakes.map((quake, index) => (
          <motion.div
            key={index}
            className="bg-gradient-to-r from-teal-400 to-cyan-500 rounded-lg shadow-lg p-4 flex flex-col justify-between transition-transform duration-200 "
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <h3 className="text-xl font-semibold mb-2 text-white">{quake.title}</h3>
            <p className="text-white">{quake.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Previous Button */}
      <Link to="/presentationthree" className="absolute bottom-5 left-5"> 
        <button className="bg-white bg-opacity-80 rounded-full w-12 h-12 flex items-center justify-center shadow-lg  transition duration-200"> 
          <IoIosArrowBack size={24} color="#000" /> 
        </button> 
      </Link> 

      {/* Next Button */}
      <Link to="/presentationfive" className="absolute bottom-5 right-5"> 
        <button className="bg-white bg-opacity-80 rounded-full w-12 h-12 flex items-center justify-center shadow-lg  transition duration-200"> 
          <IoIosArrowForward size={24} color="#000" /> 
        </button> 
      </Link> 
    </section>
  );
}

export default PresentationFour;
