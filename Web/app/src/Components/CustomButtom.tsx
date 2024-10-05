import React from "react";

interface CustomButtonProps {
  text: string; // Declaring the type for the 'text' prop
  icon?: React.ReactNode;
}

// Arrow function syntax for functional component
const CustomButton: React.FC<CustomButtonProps> = ({ text, icon }) => (
  <button className="bg-[#FFF9F9] rounded-required p-5 font-bold text-black text-2xl flex justify-center items-center">
    {text}
    {icon && <span className="text-black px-5 pt-2 flex justify-center items-center">{icon}</span>}
  </button>
);

export default CustomButton;
