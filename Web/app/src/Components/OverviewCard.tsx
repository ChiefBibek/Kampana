import React from "react";

interface OverviewCardProps {
  title: string;
  imageSrc: string;
  description: string; // New prop for description
}

const OverviewCard: React.FC<OverviewCardProps> = ({ title, imageSrc, description }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden w-full md:w-1/2 lg:w-1/3 xl:w-1/4 shadow-lg transition-transform transform hover:scale-105 group relative">
      {/* Image */}
      <div className="relative">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-64 object-cover group-hover:opacity-70 transition-opacity"
        />
        {/* Title */}
        <h2 className="absolute bottom-4 left-24 text-white text-3xl font-semibold">
          {title}
        </h2>
      </div>

      {/* Short Description */}
      <div className="absolute inset-0 bg-gray-800 bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
        <div className="p-8 flex items-center justify-center h-full">
          <p className="text-gray-300 text-lg text-center">
            {description} {/* Render the description */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;
