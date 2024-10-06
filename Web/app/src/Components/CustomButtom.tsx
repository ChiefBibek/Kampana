import React from "react";

interface CustomButtonProps {
  text: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ text, icon, onClick }) => (
  <button
    onClick={onClick}
    className="bg-[#FFF9F9] rounded-required py-3 px-4 font-semibold text-black text-xl flex justify-center items-center space-x-2"
  >
    {/* Flex container with space between text and icon */}
    <span>{text}</span>
    {icon && <span className="flex items-center">{icon}</span>}
  </button>
);

export default CustomButton;
