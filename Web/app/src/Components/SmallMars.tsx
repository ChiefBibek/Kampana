import { useTexture } from "@react-three/drei";
import React from "react";

const SmallMars: React.FC = () => {
  // Load the Mars texture
  const marsTexture = useTexture('./Images/8k_mars.jpg');

  return (
    <mesh>
      {/* Sphere geometry for Mars */}
      <sphereGeometry args={[1, 32, 32]} />
      {/* Apply the Mars texture to the mesh material */}
      <meshStandardMaterial map={marsTexture} />
    </mesh>
  );
};

export default SmallMars;
