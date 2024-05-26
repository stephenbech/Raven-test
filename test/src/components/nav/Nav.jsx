import React from 'react';
import { FaXmark } from 'react-icons/fa6';

const Nav = ({ menuVisible, hideMenu }) => {
  return (
    <nav id="navLinks" style={{ right: menuVisible ? "0" : "-200px" }}>
      <FaXmark className="fa fa-times" onClick={() => hideMenu()}></FaXmark>
      <ul>
        <li className='active'><a href="/">Exchange</a></li>
        <li><a  style={{color: "#A7B1BC !important"}} href="/">Wallet</a></li>
        <li><a to="/profile">Roqqu Hub</a></li>
        
      </ul>
    </nav>
  );
};

export default Nav;
