import React from 'react';
import { NavLink } from 'react-router-dom';

interface NavItems {
  name: string;
  path: string;
}

const HomeNav: React.FC = () => {
  const navItems: NavItems[] = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Sign In', path: '/sign-in' },
    { name: 'Sign Up', path: '/sign-up' },
  ];

  return (
    <nav className="navbar">
      <h2 className="navbar-logo">RideWise</h2>
      <ul className="navbar-list">
        {navItems.map((item, index) => (
          <li key={index} className="navbar-item">
            <NavLink
              to={item.path}
              className="navbar-link"
              activeClassName="active"
              exact // Add exact for home page
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default HomeNav;
