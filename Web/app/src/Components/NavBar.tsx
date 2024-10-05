import { SpaceByte } from "../Images";
import { NavContent } from "../Data";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();


  const navbarStyle = location.pathname === "/"
    ? "bg-transparent"
    : "bg-black";

  return (
    <header className={`flex justify-between ${navbarStyle}`}>
      <div>
        <img src={SpaceByte} alt="logo" />
      </div>
      <nav>
        <ul className="flex">
          {NavContent.map((item, index) => (
            <li key={index} className="text-white m-5 cursor-pointer">
              <Link to={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
