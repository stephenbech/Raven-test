import React, { useState, useEffect, useRef } from 'react';
import Nav from '../nav/Nav';
import Profile from '../profile/Profile';
import { GoGlobe } from 'react-icons/go';
import { TbLogout2 } from 'react-icons/tb';
import './header.css';
import { useAuth } from '../../utils/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Globe from '../globe/Globe';
import { HiMiniBars3CenterLeft } from "react-icons/hi2";

const Header = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const dropdownRef = useRef(null);

  const showMenu = () => {
    setMenuVisible(true);
  };

  const hideMenu = () => {
    setMenuVisible(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    navigate('/auth');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setToggle(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    setToggle((prevToggle) => !prevToggle);
  };

  const handleButtonClick = (event) => {
    event.stopPropagation();
    handleToggle();
  };

  return (
    <header>
      <div className="left-menu">
        <div className="logo">
          <img src="images/Logomark.png" alt="Logo" />
          <span>Sisyphus</span>
        </div>
        <div className="divider"></div>
        <Nav menuVisible={menuVisible} hideMenu={hideMenu} />
      </div>
      <div className="right-menu">
        <Profile />
        <GoGlobe  className='fa' />
        <TbLogout2 className="logout2" onClick={handleLogout} />
        <div className=" logout" >
          <HiMiniBars3CenterLeft ref={dropdownRef} className="fa logout" onClick={handleButtonClick}/>
        </div>
        {toggle && (
          <div  className="" >
            <div className="globe-dropdown" ref={dropdownRef}>
              <div className='countries'>
                <li className='prof'><a to="/">Exchange</a></li>
                <li className='prof'><a to="/">Wallet</a></li>
                <li className='prof'><a to="/profile">Roqqu Hub</a></li>
                <li className="logout prof" onClick={handleLogout} ><a to="#" id="nav-logout-button">Log out</a></li>
              </div>
            </div>
          </div>
        ) }
      </div>
      


    </header>
  );
};

export default Header;
