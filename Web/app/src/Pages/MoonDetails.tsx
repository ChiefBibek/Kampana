import MoonBrief from "../Components/MoonBrief";
import Globe from "react-globe.gl";
import { MoonTexture } from "../Images"; // Ensure this texture is a high-quality moon texture
import { useEffect, useRef } from "react";

const MoonDetails = () => {
  const globeEl = useRef<any>(null);

  useEffect(() => {
    if (globeEl.current) {
      const controls = globeEl.current.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 1.3;

      // Set the initial point of view on the Moon
      globeEl.current.pointOfView({ lat: 0, lng: 0, altitude: 3 }); // Adjust the coordinates for the Moon

      // Disable user interactions
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.enableRotate = false;
    }
  }, []);

  return (
    <section className="flex bg-black text-white overflow-hidden h-[86.4vh]">
      {/* Moon Description on the Left */}
      <div className="">
        <MoonBrief />
      </div>
      {/* Moon Globe on the Right */}
      <div className="">
        <Globe ref={globeEl} globeImageUrl={MoonTexture} />
      </div>
    </section>
  );
};

export default MoonDetails;
