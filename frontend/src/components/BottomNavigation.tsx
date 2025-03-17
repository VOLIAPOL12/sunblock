import { NavLink } from "react-router-dom";
import { FaHome, FaCalculator } from "react-icons/fa";
import { IoWarning } from "react-icons/io5";

import "./BottomNavigation.css"; // 样式文件（下一步创建）

const BottomNavigation = () => {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" className="nav-item">
        <FaHome size={24} />
      </NavLink>
      <NavLink to="/sunscreen" className="nav-item">
        <FaCalculator size={24} />
      </NavLink>
      <NavLink to="/uv-impact" className="nav-item">
        <IoWarning size={24} />
      </NavLink>
    </nav>
  );
};

export default BottomNavigation;
