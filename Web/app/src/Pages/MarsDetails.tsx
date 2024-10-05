import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import SmallMars from "../Components/SmallMars";
import MarsBrief from "../Components/MarsBrief";

const MarsDetails = () => {
  return (
    <section className="flex h-[86.4vh] overflow-hidden">
      <div className="w-3/4">
        <MarsBrief/>
      </div>
      <div className="h-screen relative w-1/4">
        <Canvas>
          <OrbitControls />
          <SmallMars/>
        </Canvas>
      </div>
    </section>
  );
};

export default MarsDetails;
