import { SeismicData } from "../Data";
import { seismic } from "../Images";

const Explain = () => {
  return (
    <section className="flex bg-[#000000] text-white py-5 px-10">
      {/* Image Section - 20% width */}
      <div className="flex-none w-[20%]">
        <img
          src={seismic}
          alt="seismic data"
          className="w-full h-auto" // Ensures the image scales appropriately with the width
        />
      </div>

      {/* Description Section - 80% width */}
      <div className="flex-1 flex flex-col justify-start items-center pt-5">
        {SeismicData.map((value, index) => (
          <div key={index} className="flex flex-col items-center mb-8 px-10">
            <h1 className="text-center font-bold text-4xl pb-5">{value.title}</h1>
              <p className="text-2xl">{value.description1}</p>
              <p className="text-2xl">{value.description2}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Explain;
