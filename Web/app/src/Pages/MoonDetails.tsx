import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import MoonBrief from "../Components/MoonBrief";
import SmallMoon from "../Components/SmallMoon";

const MoonDetails = () => {
  return (
    <section className="flex h-[86.4vh] overflow-hidden">
    <div className="w-3/4">
      <MoonBrief />
    </div>
    <div className="h-screen relative w-1/4">
      <Canvas>
        <OrbitControls />
        <SmallMoon/>
      </Canvas>
    </div>
  </section>
  )
}

export default MoonDetails