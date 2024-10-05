import { Rocket } from "lucide-react";
import NavBar from "./NavBar";
import CustomButton from "./CustomButtom";

const HeroSection = () => {
  return (
    <section className="bg-hero bg-cover bg-center ">
      <NavBar />
      <div className="text-white pl-10 w-2/5 pt-[16rem] pb-16">
        <h1 className="font-bold text-[2.5rem]">Insight Lander</h1>
        <p className="py-7 text-2xl">
          InSight Lander was the first mission to study in depth the inner space
          of Mars: its crust, mantle, and core. But InSight was more than a Mars
          mission. It studied processes...
        </p>
        <CustomButton text={"Start Exploring"} icon={<Rocket size={24} />} />
      </div>
    </section>
  );
};

export default HeroSection;
