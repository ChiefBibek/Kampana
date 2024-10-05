import React from 'react';
import './AboutUs.css';
import { solarsystem } from '../Images';

const AboutUs: React.FC = () => {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <p>
        Mars Seismic Detection Project - Detecting seismic activities on Mars.
      </p>
      <img className='solarsys' src={solarsystem} alt="solar" />
      <p id='about-par'>
      We are a team of six passionate innovators participating in the NASA Space Apps Challenge 2024. Our project focuses on developing a cutting-edge solution for seismic wave detection on Mars. Combining our diverse skills in data science, engineering, and software development, we aim to enhance the understanding of Mars' seismic activities, contributing to future space exploration and planetary research.
      </p>

      <h1 id='our-team'>Our Team</h1>
      <div className="team-container">
        <div className='upper'>
          <div className="team-member">1</div>
          <div className="team-member">2</div>
          <div className="team-member">3</div>
        </div>
        <div className='lower'>
          <div className="team-member">4</div>
          <div className="team-member">5</div>
          <div className="team-member">6</div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
