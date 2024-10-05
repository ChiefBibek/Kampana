import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Slider from "react-slick";
import { Canvas } from "@react-three/fiber";
import Moon from "./Moon";
import Mars from "./Mars";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { gsap } from "gsap";

const ThreeModel: React.FC = () => {
  const sliderRef = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const textRef = useRef<HTMLHeadingElement>(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: false,
    touchMove: false,
    beforeChange: (current: number, next: number) => setCurrentSlide(next),
    ref: sliderRef,
  };

  // Function to navigate to a specific slide
  const goToSlide = (index: number) => {
    sliderRef.current?.slickGoTo(index);
  };

  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power1.out" }
      );
    }
  }, [currentSlide]);

  const handleTextClick = () => {
    if (currentSlide === 0) {
      navigate("/event-detection/moon");  } else {
      navigate("/event-detection/mars");
    }
  };

  return (
    <div className="flex flex-col justify-between bg-planetbg">
      <div className="flex-grow relative">
        <Slider {...settings}>
          <div className="h-screen w-screen relative">
            <Canvas className="absolute inset-0">
              <ambientLight intensity={0.5} />
              <Moon />
            </Canvas>
          </div>
          <div className="h-screen w-screen relative">
            <Canvas className="absolute inset-0">
              <ambientLight intensity={0.5} />
              <Mars />
            </Canvas>
          </div>
        </Slider>

        {/* Overlay Text with Click Handler */}
        <h1
          ref={textRef}
          onClick={handleTextClick} // Add click handler here
          className="absolute top-10 left-1/2 transform -translate-x-1/2 text-4xl font-bold text-white text-center cursor-pointer"
        >
          {currentSlide === 0 ? "Moon" : "Mars"}
        </h1>
      </div>

      {/* Footer with Planet Buttons */}
      <footer className="bg-gray-900 text-white py-4 text-center space-x-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => goToSlide(0)}
        >
          Moon
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => goToSlide(1)}
        >
          Mars
        </button>
      </footer>
    </div>
  );
};

export default ThreeModel;
