import React from "react"; 
import { Link } from "react-router-dom"; 
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"; 
import { motion } from "framer-motion"; 

const PresentationThree: React.FC = () => { 
    // Animation variants for sliding in effect
    const slideInVariants = {
        hidden: { opacity: 0, x: 100 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 20,
            },
        },
    };

    return ( 
        <section className="bg-slide3 min-h-screen relative flex flex-col justify-center items-center p-6 space-y-10"> 
            {/* Seismic Sensors Card */}
            <motion.div 
                className="bg-gradient-to-r from-red-600 via-red-500 to-orange-400 bg-opacity-80 p-6 rounded-lg shadow-md max-w-md text-center text-white absolute top-5"
                initial="hidden" 
                animate="visible" 
                variants={slideInVariants}
                transition={{ delay: 0 }} // No delay for the first card
            >
                <h2 className="text-2xl font-bold mb-2">Seismic Sensors on the Martian Surface</h2>
            </motion.div>
            
            {/* InSight Lander Card */}
            <motion.div 
                className="bg-gradient-to-r from-red-600 via-red-500 to-orange-400 bg-opacity-80 p-6 rounded-lg shadow-md max-w-md text-center text-white absolute top-5 right-5"
                initial="hidden" 
                animate="visible" 
                variants={slideInVariants}
                transition={{ delay: 1 }} // Delay for the second card
            >
                <h3 className="text-xl font-semibold mb-1">InSight Lander</h3>
                <p className="mb-2">
                    The InSight lander, which landed on Mars in 2018, is equipped with a highly sensitive seismometer to detect and record marsquakes.
                </p>
            </motion.div>

            {/* Seismic Monitoring Card */}
            <motion.div 
                className="bg-gradient-to-r from-red-600 via-red-500 to-orange-400 bg-opacity-80 p-6 rounded-lg shadow-md max-w-md text-center text-white absolute"
                initial="hidden" 
                animate="visible" 
                variants={slideInVariants}
                transition={{ delay: 2 }} // Delay for the third card
            >
                <h3 className="text-xl font-semibold mb-1">Seismic Monitoring</h3>
                <p className="mb-2">
                    These seismic sensors on the Martian surface provide continuous data on the planet's internal structure and tectonic activity.
                </p>
            </motion.div>

            {/* Geological Insights Card */}
            <motion.div 
                className="bg-gradient-to-r from-red-600 via-red-500 to-orange-400 bg-opacity-80 p-6 rounded-lg shadow-md max-w-md text-center text-white absolute bottom-20 left-12 "
                initial="hidden" 
                animate="visible" 
                variants={slideInVariants}
                transition={{ delay: 3 }} // Delay for the fourth card
            >
                <h3 className="text-xl font-semibold mb-1">Geological Insights</h3>
                <p>
                    The seismic data from Mars helps scientists better understand the planet's formation, evolution, and potential for harboring life.
                </p>
            </motion.div>

            {/* Navigation Buttons */}
            <Link to="/presentationtwo" className="absolute bottom-5 left-5"> 
                <button className="bg-white bg-opacity-80 rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-opacity-100 transition duration-200"> 
                    <IoIosArrowBack size={24} color="#000" /> 
                </button> 
            </Link> 

            <Link to="/presentationfour" className="absolute bottom-5 right-5"> 
                <button className="bg-white bg-opacity-80 rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-opacity-100 transition duration-200"> 
                    <IoIosArrowForward size={24} color="#000" /> 
                </button> 
            </Link> 
        </section> 
    ); 
}; 

export default PresentationThree;
