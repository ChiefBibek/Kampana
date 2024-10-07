import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const descRef = useRef<HTMLParagraphElement>(null);
  const navigate = useNavigate();

  // Descriptions for each planet
  const descriptions = {
    0: "The Moon is Earth's only natural satellite, playing a vital role in our planet's tides and climate.",
    1: "Mars is known as the Red Planet, famous for its reddish appearance and potential for past life.",
  };

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

  const goToSlide = (index: number) => {
    sliderRef.current?.slickGoTo(index);
  };

  useEffect(() => {
    if (textRef.current && descRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power1.out" }
      );

      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power1.out" }
      );
    }
  }, [currentSlide]);

  const handleTextClick = () => {
    if (currentSlide === 0) {
      navigate("/event-detection/moon");
    } else {
      navigate("/event-detection/mars");
    }
  };

  return (
    <div className="flex flex-col justify-between bg-planetbg bg-cover bg-center h-[86.4vh] overflow-hidden">
      <div className="flex-grow relative">
        <Slider {...settings}>
          <div className="h-[90vh] w-screen relative pt-10">
            <Canvas className="absolute inset-0">
              <ambientLight intensity={1} />
              <Moon />
            </Canvas>
          </div>
          <div className="h-[90vh] w-screen relative pt-10">
            <Canvas className="absolute inset-0">
              <ambientLight intensity={1} />
              <Mars />
            </Canvas>
          </div>
        </Slider>

        <h1
          ref={textRef}
          onClick={handleTextClick}
          className="absolute top-5 left-1/2 transform -translate-x-1/2 text-4xl font-bold text-white text-center cursor-pointer bg-gray-600 px-6 py-3 rounded-full hover:bg-black transition duration-300 ease-in-out active:bg-blue-800 shadow-lg"
        >
          {currentSlide === 0 ? "Moon" : "Mars"}
        </h1>

        {/* Description Text */}
        <p
          ref={descRef}
          className="absolute top-20 left-1/2 transform -translate-x-1/2 text-xl text-white text-center"
        >
          {descriptions[currentSlide]}
        </p>

        {/* Planet Navigation Buttons */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 space-x-32"
          style={{ top: "85%" }}
        >
          <button
            className="bg-red-500 px-8 py-4 text-white rounded-full text-xl font-semibold shadow-md hover:bg-red-600 hover:shadow-lg transition duration-300 ease-in-out active:bg-red-700 active:scale-95"
            onClick={() => goToSlide(0)}
          >
            Moon
          </button>
          <button
            className="bg-blue-500 px-8 py-4 text-white rounded-full text-xl font-semibold shadow-md hover:bg-blue-600 hover:shadow-lg transition duration-300 ease-in-out active:bg-blue-700 active:scale-95"
            onClick={() => goToSlide(1)}
          >
            Mars
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThreeModel;
