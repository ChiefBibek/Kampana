import { cardData } from "../Data";
import OverviewCard from "./OverviewCard";

const BriefOverView = () => {
  return (
    <section className="bg-star bg-center bg-cover text-white py-10">
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
    </section>
  );
};

export default BriefOverView;
