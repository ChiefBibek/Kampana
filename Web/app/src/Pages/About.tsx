import React from "react";
import { solarsystem } from "../Images";
import { OurTeam } from "../Data";

const AboutUs: React.FC = () => {
  return (
    <section className="bg-black text-white px-20 py-5">
      <div className="flex">
        <div className="flex flex-col">
          <p className="text-2xl">
            Mars Seismic Detection Project - Detecting seismic activities on
            Mars.
          </p>
          <p className="text-xl">
            We are a team of six passionate innovators participating in the NASA
            Space Apps Challenge 2024. Our project focuses on developing a
            cutting-edge solution for seismic wave detection on Mars. Combining
            our diverse skills in data science, engineering, and software
            development, we aim to enhance the understanding of Mars' seismic
            activities, contributing to future space exploration and planetary
            research.
          </p>
        </div>
        <img className="" src={solarsystem} alt="solar" width={350} />
      </div>
      <h1 className="mb-8 text-3xl">Our Team</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-28">
        {OurTeam.map((member, index) => (
          <div key={index} className="relative group overflow-hidden">
            <img
              src={member.image} // Use the image path from the member object
              alt={member.name}
              className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-110" // Image takes the whole card and scales up on hover
            />
            <div className="absolute inset-x-0 bottom-0 h-1/5 flex flex-col items-center justify-center bg-black bg-opacity-70 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0">
              <h2 className="text-xl font-bold">{member.name}</h2>
              <p className="text-md">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutUs;
