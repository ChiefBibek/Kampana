import { MoonBriefData } from "../Data";
import CustomButton from "./CustomButtom";

const MoonBrief = () => {
    return (
        <section className="pt-40 px-32">
          <h1 className="uppercase">Only natural satellite</h1>
          <h2 className="uppercase text-9xl">Moon</h2>
          <hr className="w-24 border-t-4 border-red-500 my-4 rounded-md" />{" "}
          {MoonBriefData.map((value, index) => (
            <p key={index}>{value.text}</p>
          ))}
          <CustomButton text="Lets see data"/>
        </section>
      );
}

export default MoonBrief