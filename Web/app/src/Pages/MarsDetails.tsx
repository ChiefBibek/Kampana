import { Canvas } from "@react-three/fiber";
import Moon from "../Components/Moon";
import Mars from "../Components/Mars";

const MarsDetails = () => {
  return (
    <section className="flex ">
      <div className="bg-red-500 w-3/4">Hello World</div>
      <div className="h-screen w-screen relative">
            <Canvas className="absolute inset-0">
             <Mars/>
            </Canvas>
          </div>
    </section>
  );
};

export default MarsDetails;
