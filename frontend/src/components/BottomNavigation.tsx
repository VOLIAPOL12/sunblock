import { NavLink } from "react-router-dom";
import { FaHome, FaSun, FaRadiation } from "react-icons/fa";
import "./BottomNavigation.css"; // 样式文件（下一步创建）

const BottomNavigation = () => {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" className="nav-item">
        <FaHome size={24} />
      </NavLink>
      <NavLink to="/splash" className="nav-item">
        <FaSun size={24} />
      </NavLink>
      <NavLink to="/uv" className="nav-item">
        <FaRadiation size={24} />
      </NavLink>
    </nav>
  );
};

export default BottomNavigation;
