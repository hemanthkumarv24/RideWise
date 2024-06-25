import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import profile from "../../assets/profile.png";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Perform any logout operations here, such as clearing user data, etc.
    navigate("/"); // Navigate to the Login page
  };

  const Menu = [
    { name: "History", action: null },
    { name: "Log Out", action: handleLogout },
  ];

  return (
    <div className="Navbar">
      <h1>RIDEWISE</h1>
      <ul>
        <Link to="/Home2" className="Home">
          <li>Home</li>
        </Link>
        {/* <Link to="/About" className="About">
          <li>About</li>
        </Link> */}
        <li className="Analytics">Analytics</li>
      </ul>
      <div className="relative">
        <img
          className="profile-icon cursor-pointer"
          src={profile}
          alt="profile"
          onClick={toggleDropdown}
        />
        {isDropdownOpen && (
          <div className="dropdown">
            <ul>
              {Menu.map((menu, index) => (
                <li key={index} className="dropdown-item" onClick={menu.action}>
                  {menu.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
