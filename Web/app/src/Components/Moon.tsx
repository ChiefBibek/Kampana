import React, { useRef } from "react";
import {  useFrame } from "@react-three/fiber";
import {  useTexture } from "@react-three/drei";
import * as THREE from "three";

const Moon: React.FC = () => {
  const tex = useTexture("./Images/8k_moon.jpg");
  const planet = useRef<THREE.Mesh>(null);
  
  useFrame((_, delta) => {
    if (planet.current) {
      planet.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <mesh ref={planet}>
      <sphereGeometry args={[2, 50, 50]} />
      <meshStandardMaterial map={tex} roughness={0} />
    </mesh>
  );
};

export default Moon;