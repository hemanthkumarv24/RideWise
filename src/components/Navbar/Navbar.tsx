import React, { useState } from "react";
import "./Navbar.css";
import profile from "../../assets/profile.png";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const Menu = ["History", "Fav Routes", "Log Out"];

  return (
    <div className="Navbar">
      <h1>RIDEWISE</h1>
      <ul>
        <li>Home</li>
        <li>
          About
        </li>
        <li>Analytics</li>
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
                <li key={index} className="dropdown-item">
                  {menu}
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
