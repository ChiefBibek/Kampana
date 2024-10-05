import { MarsBriefData } from "../Data";
import CustomButton from "./CustomButtom";

const MarsBrief = () => {
  return (
    <section className="pt-40 px-32">
      <h1 className="uppercase">The Red Planet</h1>
      <h2 className="uppercase text-9xl">mars</h2>
      <hr className="w-24 border-t-4 border-red-500 my-4 rounded-md" />{" "}
      {MarsBriefData.map((value, index) => (
        <p key={index}>{value.text}</p>
      ))}
      <CustomButton text="Lets see data"/>
    </section>
  );
};

export default MarsBrief;
