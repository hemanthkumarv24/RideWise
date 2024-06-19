import { Link } from 'react-router-dom';
import "./Navbar.css";
import profile from "../../assets/profile.png";
const Navbar = () => {
  return (
    <div className="Navbar">
      {" "}
      <h1 color="BLACK">RIDEWISE</h1>
      <ul>
        <li>Home</li>
        <li><Link to="/About">About</Link></li>
        <li>Data Analysis</li>
      </ul>
      <div>
        <img className="profile-icon" src={profile} alt="" />
      </div>
    </div>
  );
};

export default Navbar;
