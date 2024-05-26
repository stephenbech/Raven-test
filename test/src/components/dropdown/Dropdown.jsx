import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Dropdown.css';
import { IoMenuOutline } from 'react-icons/io5';
import { BiCog } from 'react-icons/bi';
import { PiScroll, PiSignOutLight } from 'react-icons/pi';
import { MdOutlineCardGiftcard, MdOutlineBugReport, MdOutlineSwitchAccount } from 'react-icons/md';

export const CustomDropdown = ({ options, selectedValue, onChange, placeholder, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value) => {
    onChange(value);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`custom-dropdown ${className}`} ref={dropdownRef}>
      <div className="custom-dropdown-header" onClick={handleToggleDropdown}>
        <span>{selectedValue ? options.find(option => option.value === selectedValue).label : placeholder}</span>
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </div>
      {isOpen && (
        <div className="custom-dropdown-list">
          {options.map((option, index) => (
            <div
              key={index}
              className={`custom-dropdown-item ${option.value === selectedValue ? 'selected' : ''}`}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

CustomDropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

CustomDropdown.defaultProps = {
  selectedValue: '',
  placeholder: 'Select an option',
  className: '',
};






const MenuDropdown = () => {
  const [toggle, setToggle] = useState(false);
  const dropdownRef = useRef(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://fe-task-api.mainstack.io/user');
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setToggle(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, []);

  const handleToggle = () => {
    setToggle((prevToggle) => !prevToggle);
   //  handleMenuItemClick('bar');
   //  if (toggle) {
   //    handleMenuItemClick('Revenue');
   //  }
  };

  const handleButtonClick = (event) => {
    event.stopPropagation();
    handleToggle();
  };

  return (
    <div>
      {!toggle ? (
        <div className='menu-toggle' onClick={handleToggle}>
          <div>
            <button className='menu-button' onClick={handleButtonClick}>
              <div className='menu-button-icon'>
                <span className='menu-button-initials'>
                  {data.first_name && data.last_name ? `${data.first_name.charAt(0)}${data.last_name.charAt(0)}` : ''}
                </span>
              </div>
              <IoMenuOutline className='menu-icon' />
            </button>
          </div>
        </div>
      ) : (
        <div ref={dropdownRef} className='menu-toggle' onClick={handleToggle}>
          <div>
            <button className='menu-button' onClick={handleButtonClick}>
              <div className='menu-button-icon'>
                <span className='menu-button-initials'>
                  {data.first_name && data.last_name ? `${data.first_name.charAt(0)}${data.last_name.charAt(0)}` : ''}
                </span>
              </div>
              <IoMenuOutline className='menu-icon' />
            </button>
          </div>
        </div>
      )}
      {toggle && (
        <div className='dropdown-menu'>
          <div className='dropdown-item'>
            <div className='dropdown-content'>
              <div className='dropdown-icon'>
                <span className='dropdown-initials'>
                  {data.first_name && data.last_name ? `${data.first_name.charAt(0)}${data.last_name.charAt(0)}` : ''}
                </span>
              </div>
              <div className='dropdown-text'>
                <p className='dropdown-name'>{data.first_name} {data.last_name}</p>
                <p className='dropdown-email'>{data.email}</p>
              </div>
            </div>
          </div>
          <div className='dropdown-item'>
            <div className='dropdown-content'>
              <div className='dropdown-icon'>
                <BiCog className='menu-icon' />
              </div>
              <div className='dropdown-text'>
                <p className='dropdown-option'>Settings</p>
              </div>
            </div>
          </div>
          <div className='dropdown-item'>
            <div className='dropdown-content'>
              <div className='dropdown-icon'>
                <PiScroll className='menu-icon' />
              </div>
              <div className='dropdown-text'>
                <p className='dropdown-option'>Purchase History</p>
              </div>
            </div>
          </div>
          <div className='dropdown-item'>
            <div className='dropdown-content'>
              <div className='dropdown-icon'>
                <MdOutlineCardGiftcard className='menu-icon' />
              </div>
              <div className='dropdown-text'>
                <p className='dropdown-option'>Refer and Earn</p>
              </div>
            </div>
          </div>
          <div className='dropdown-item'>
            <div className='dropdown-content'>
              <div className='dropdown-icon'>
                <img src='assets/widgets.png' alt='' className='menu-icon' />
              </div>
              <div className='dropdown-text'>
                <p className='dropdown-option'>Integrations</p>
              </div>
            </div>
          </div>
          <div className='dropdown-item'>
            <div className='dropdown-content'>
              <div className='dropdown-icon'>
                <MdOutlineBugReport className='menu-icon' />
              </div>
              <div className='dropdown-text'>
                <p className='dropdown-option'>Report Bug</p>
              </div>
            </div>
          </div>
          <div className='dropdown-item'>
            <div className='dropdown-content'>
              <div className='dropdown-icon'>
                <MdOutlineSwitchAccount className='menu-icon' />
              </div>
              <div className='dropdown-text'>
                <p className='dropdown-option'>Switch Account</p>
              </div>
            </div>
          </div>
          <div className='dropdown-item'>
            <div className='dropdown-content'>
              <div className='dropdown-icon'>
                <PiSignOutLight className='menu-icon' />
              </div>
              <div className='dropdown-text'>
                <p className='dropdown-option'>Sign Out</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuDropdown;
