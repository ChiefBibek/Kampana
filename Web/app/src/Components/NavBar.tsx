import { Project } from "../Images";
import { NavContent } from "../Data";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();

  // Define routes where the navbar should be hidden
  const hiddenRoutes = [
    "/presentation",
    "/presentationtwo",
    "/presentationthree",
    "/presentationfour",
    "/presentationfive",  // New route added
    "/presentationsix",   // New route added
    "/presentationseven"   // New route added
  ]; // Add more routes as needed
    const showNavbar = !hiddenRoutes.includes(location.pathname);

  return (
    <>
      {showNavbar && (
        <header className={`flex justify-between ${location.pathname === "/" ? "bg-transparent" : "bg-black"}`}>
          <div>
            <img src={Project} alt="logo" width={100} />
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
      )}
    </>
  );
};

export default NavBar;
