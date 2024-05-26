import React, { useState, useRef } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import './Globe.css';

const countries = [
  {
    name: 'Nigeria',
    code: 'NGN',
    image: 'images/ngn.png',
  },
  {
    name: 'British Pounds',
    code: 'GBP',
    image: 'images/gbp.png',
  },
  {
    name: 'US Dollars',
    code: 'USD',
    image: 'images/usd.png',
  },
  {
    name: 'Europeans Euros',
    code: 'EUR',
    image: 'images/eur.png',
  },
];

function Globe() {
  const [toggle, setToggle] = useState(false);
  const [selected, setSelected] = useState(countries[0]); // set the initial selected country to the first one
  const dropdownRef = useRef(null);

  const handleCountryClick = (country) => {
    setSelected(country); // set the selected country to the one that was clicked
    setToggle(false);
  };

  const handleToggle = () => {
    setToggle((prevToggle) => !prevToggle);
  };

  return (
    <div className="globe-container">
      <div ref={dropdownRef} className="globe-selected" onClick={handleToggle}>
        <span>{selected.name}</span> <FaChevronDown style={{ width: '12px', height: '12px' }} />
      </div>
      {toggle && (
        <div className="globe-dropdown">
          <div className="countries">
            {countries.map((country) => (
              <div className="prof" key={country.code} onClick={() => handleCountryClick(country)}>
                <img src={country.image} alt={country.name} className="country-image" />
                <div className="count">
                  <p>{country.name}</p>
                  <span>{country.code}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Globe;


{/* <div className='globe-dropdown' >
<div className='countries'>
  {
    countries.map((country) => (
      <div className='country' key={country.code} onClick={() => handleCountryClick(country)}>
        <img src={country.image} alt={country.name} />
        <p>{country.name}</p>
      </div>
    ))
  }
  <div className="prof">
    <img src="images/gbp.png" alt="Profile " className="profile-img" />
    <div className='count'>
      <p>British Pounds</p>
      <span>GBP</span>
    </div>
  </div>
  <div className="prof">
    <img src="images/usd.png" alt="Profile " className="profile-img" />
    <div className='count'>
      <p>US Dollars</p>
      <span>USD</span>
    </div>
  </div>
  <div className="prof2">
    <img src="images/eur.png" alt="Profile " className="profile-img" />
    <div className='count'>
      <p>European Euros</p>
      <span>EUR</span>
    </div>
  </div>
</div>
</div> */}