import React from "react";
import { solarsystem } from "../Images";

const AboutUs: React.FC = () => {
  return (
    <div className="bg-black text-white">
      <div className="flex ">
        <div className="flex flex-col">
          <p className=" text-2xl">
            Mars Seismic Detection Project - Detecting seismic activities on
            Mars.
            <p  className="">
              We are a team of six passionate innovators participating in the
              NASA Space Apps Challenge 2024. Our project focuses on developing
              a cutting-edge solution for seismic wave detection on Mars.
              Combining our diverse skills in data science, engineering, and
              software development, we aim to enhance the understanding of Mars'
              seismic activities, contributing to future space exploration and
              planetary research.
            </p>
          </p>
        </div>
        <img className="" src={solarsystem} alt="solar" />
      </div>

      <h1 id="our-team" className="mb-28">
        Our Team
      </h1>
      <div className="h-[90vh] w-[80vw] mx-auto mb-56">
        <div className="flex items-center justify-center gap-[3vw] h-[50%]">
          <div className="w-[20vw] h-[42vh] bg-gray-400 flex justify-center items-center text-black text-lg rounded-[10%]">
            1
          </div>
          <div className="w-[20vw] h-[42vh] bg-gray-400 flex justify-center items-center text-black text-lg rounded-[10%]">
            2
          </div>
          <div className="w-[20vw] h-[42vh] bg-gray-400 flex justify-center items-center text-black text-lg rounded-[10%]">
            3
          </div>
        </div>
        <div className="mt-[3vh] flex items-center justify-center gap-[1vw] h-[50%]">
          <div className="w-[20vw] h-[42vh] bg-gray-400 flex justify-center items-center text-black text-lg rounded-[10%]">
            4
          </div>
          <div className="w-[20vw] h-[42vh] bg-gray-400 flex justify-center items-center text-black text-lg rounded-[10%]">
            5
          </div>
          <div className="w-[20vw] h-[42vh] bg-gray-400 flex justify-center items-center text-black text-lg rounded-[10%]">
            6
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
