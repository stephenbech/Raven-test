import React, { useEffect, useState, useRef } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import './Profile.css'; 

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [toggle, setToggle] = useState(false);
  const dropdownRef = useRef(null);
  const mobileImageRef = useRef(null);

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem('profile'));
    console.log('Stored Profile:', storedProfile);
    if (storedProfile) {
      setProfile(storedProfile);
    }

    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        (!mobileImageRef.current || !mobileImageRef.current.contains(event.target))
      ) {
        setToggle(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!profile) return null;

  const { email, gravatarUrl, repos } = profile;

  const handleToggle = () => {
    setToggle((prevToggle) => !prevToggle);
  };

  const handleButtonClick = (event) => {
    event.stopPropagation();
    handleToggle();
  };

  return (
    <div>
      <div ref={dropdownRef} className="profile" id="profile-section" onClick={handleButtonClick}>
        
          <img className="fa" src={gravatarUrl} alt="Gravatar" id="gravatar-image" />
        
        <span>{email}</span>
        <FaChevronRight style={{fontSize: "10px", }} aria-hidden="true" />
      </div>
      <div className="mobile-only">
        <img className="prof-img" ref={mobileImageRef} onClick={handleButtonClick} src={gravatarUrl} alt="Gravatar" id="gravatar-image" />
      </div>
      {toggle && (
        <div className="dropdown-content">
          <div className="dropdown-item">
            <div className="prof">
              <img src={gravatarUrl} alt="Profile Image" className="profile-img" />
              <span>{email}</span>
            </div>
          </div>
          {repos && (
            <div className="dropdown-item">
              <strong>Repositories:</strong>
              <ul>
                {repos.slice(0, 5).map((repo, index) => <li key={index}>{repo}</li>)}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
