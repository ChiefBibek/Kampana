// Layout.js
import { Outlet, useLocation } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = () => {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== "/" && <NavBar />}
      <Outlet />
    </div>
  );
};

export default Layout;
