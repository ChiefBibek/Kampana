import {useNavigate } from "react-router-dom";
import CustomButton from "./CustomButtom";

const MarsBrief = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/event-detection/mars/marsdthree"); // Navigate to the /presentation route
  };

  return (
    <section className="pt-40 px-32">
      <h1 className="uppercase">The Red Planet</h1>
      <h2 className="uppercase text-9xl">mars</h2>
      <hr className="w-24 border-t-4 border-red-500 my-4 rounded-md" />{" "}

      <CustomButton text="Lets see data" onClick={handleButtonClick}/>
    </section>
  );
};

export default MarsBrief;
