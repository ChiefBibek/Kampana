import { cardData, SeismicData } from "../Data";
import { seismic } from "../Images";
import OverviewCard from "./OverviewCard";

const BriefOverView = () => {
  return (
    <section className="bg-brief bg-center bg-cover text-white py-10">
      <h1 className="text-4xl font-bold text-center mb-12">Key Overview</h1>
      <div className="flex flex-wrap justify-center gap-10">
        {cardData.map((card, index) => (
          <OverviewCard
            key={index} 
            title={card.title}
            imageSrc={card.imageSrc}
            description={card.description} 
          />
        ))}
      </div>
      
      <div className="flex  text-white py-14 px-10">

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
        </div>
    
    </section>
  );
};

export default BriefOverView;
