
import MarsBrief from "../Components/MarsBrief";
import { useEffect, useRef } from "react";
import Globe from "react-globe.gl";
import { MarsTexture } from "../Images";

const MarsDetails = () => {
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
        <MarsBrief />
      </div>
      {/* Moon Globe on the Right */}
      <div className="">
        <Globe ref={globeEl} globeImageUrl={MarsTexture} />
      </div>
    </section>
  );
};

export default MarsDetails;
