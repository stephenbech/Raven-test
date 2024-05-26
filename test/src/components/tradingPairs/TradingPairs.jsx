import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TradingPairs.css';
import { FaChevronDown, FaRegChartBar } from 'react-icons/fa';
import { FaArrowUpLong, FaArrowDownLong } from "react-icons/fa6";
import { GoClock } from "react-icons/go";
import { BiSearchAlt } from 'react-icons/bi';

const TradingPairs = ({ onSelectPair }) => {
  const [tradingPairs, setTradingPairs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPairs, setFilteredPairs] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const baseImageUrl = 'https://www.cryptocompare.com';

  useEffect(() => {
    const fetchTradingPairs = async () => {
      try {
        const response = await axios.get(
          'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=30&tsym=USD',
          {
            headers: {
              authorization: `Apikey ${process.env.REACT_APP_API_KEY}`,
            },
          }
        );
        console.log('API Response:', response.data);

        if (response.data && Array.isArray(response.data.Data)) {
          setTradingPairs(response.data.Data);
          setFilteredPairs(response.data.Data); // Initialize filtered pairs with all trading pairs
          
          // Set the first crypto as the default selected crypto
          if (response.data.Data.length > 0) {
            setSelectedCrypto(response.data.Data[0]);
            onSelectPair(response.data.Data[0]); // Update selected pair
          }
        } else {
          console.error('Invalid response data format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching trading pairs:', error);
      }
    };

    fetchTradingPairs();
  }, []);

  useEffect(() => {
    if (Array.isArray(tradingPairs)) {
      const results = tradingPairs.filter(pair => {
        const pairName = `${pair.CoinInfo.Name}/${pair.DISPLAY?.USD?.TOSYMBOL}`.toLowerCase();
        const matchesSearch = pairName.includes(searchTerm.toLowerCase());
        return matchesSearch;
      });
      setFilteredPairs(results);
    }
  }, [searchTerm, tradingPairs]);

  const handleSelectCrypto = (crypto) => {
    setSelectedCrypto(crypto);
    onSelectPair(crypto); // Call the onSelectPair function with the selected crypto
    setDropdownVisible(false);
    setSearchTerm(''); // Reset search term after selecting a crypto
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (filter) => {
    if (filter === 'All') {
      setSearchTerm('');
    } else {
      setSearchTerm(filter);
    }
  };

  return (
    <div className="trading-pairs">
      {selectedCrypto ? (
        <div>
          <div className="pairs">
            <div className='top-info'>
              <div className='crypt' style={{ display: "flex", alignItems: "center" }} onClick={() => setDropdownVisible(!dropdownVisible)}>
                <div className="images">
                 <img className='profile-img' src={`${baseImageUrl}${selectedCrypto.CoinInfo.ImageUrl}`} alt={selectedCrypto.CoinInfo.Name} />
                 <img className='usdt-img' src="images/usdt.png" alt="" srcset="" />
                </div>
                <span>
                  {selectedCrypto.CoinInfo.Name}/USD
                </span>
                <FaChevronDown className='fa' />
              </div>
              <div className='green'>
                {selectedCrypto.DISPLAY?.USD?.PRICE ? selectedCrypto.DISPLAY.USD.PRICE : 'N/A'}
              </div>
              <div className="divider"></div>
            </div>
            <div className='info-div'>
              <div className='top-info2'>
                <div className="Change">
                  <div className='fa'>
                    <GoClock className='fa ' />{" "}
                    24h Change
                  </div>
                  <div className='green'>
                    {selectedCrypto.DISPLAY?.USD?.CHANGE24HOUR ? selectedCrypto.DISPLAY.USD.CHANGE24HOUR : 'N/A'}{" "}
                    {selectedCrypto.DISPLAY?.USD?.CHANGEPCT24HOUR ? selectedCrypto.DISPLAY.USD.CHANGEPCT24HOUR : 'N/A'}%
                  </div>
                </div>
                <div className="divider"></div>
                <div className="Change">
                  <div className='fa'>
                    <FaArrowUpLong className='fa ' />{" "}
                    24h Change
                  </div>
                  <div className='white'>
                    {selectedCrypto.DISPLAY?.USD?.CHANGE24HOUR ? selectedCrypto.DISPLAY.USD.CHANGE24HOUR : 'N/A'}{" "}
                    {selectedCrypto.DISPLAY?.USD?.CHANGEPCT24HOUR ? selectedCrypto.DISPLAY.USD.CHANGEPCT24HOUR : 'N/A'}%
                  </div>
                </div>
                <div className="divider"></div>
                <div className="Change">
                  <div className='fa'>
                    <FaArrowDownLong className='fa ' />{" "}
                    24h Change
                  </div>
                  <div className='white'>
                    {selectedCrypto.DISPLAY?.USD?.CHANGE24HOUR ? selectedCrypto.DISPLAY.USD.CHANGE24HOUR : 'N/A'}{" "}
                    {selectedCrypto.DISPLAY?.USD?.CHANGEPCT24HOUR ? selectedCrypto.DISPLAY.USD.CHANGEPCT24HOUR : 'N/A'}%
                  </div>
                </div>
                <div className="divider"></div>
                <div className="Change">
                  <div className='fa'>
                    <FaRegChartBar className='fa ' />{" "}
                    24h Change
                  </div>
                  <div className='white'>
                    {selectedCrypto.DISPLAY?.USD?.CHANGE24HOUR ? selectedCrypto.DISPLAY.USD.CHANGE24HOUR : 'N/A'}{" "}
                    {selectedCrypto.DISPLAY?.USD?.CHANGEPCT24HOUR ? selectedCrypto.DISPLAY.USD.CHANGEPCT24HOUR : 'N/A'}%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {dropdownVisible && (
            <div style={{ display: "flex", overflowY: "auto", scrollbarColor: "transparent" }}>
              <div className='search-dropdown'>
                <div className='market'>
                  <p>Select Market</p>
                </div>
                <div className="search">
                  <input
                    className='search-input'
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                  />
                  <BiSearchAlt className='search-icon' />
                </div>
                <div className='filt'>
                  <p onClick={() => handleFilterChange('All')}>All</p>
                  <p onClick={() => handleFilterChange('USD')}>USD</p>
                  <p onClick={() => handleFilterChange('BTC')}>BTC</p>
                </div>
                <div className='coins'>
                  {filteredPairs.map(pair => (
                    <div className='coin' key={`${pair.CoinInfo.Id}_${pair.DISPLAY?.USD?.TOSYMBOL}`} onClick={() => handleSelectCrypto(pair)}>
                      <div className="left-coin">
                        <div className="images">
                          <img src={`${baseImageUrl}${pair.CoinInfo.ImageUrl}`} alt={pair.CoinInfo.Name} className='profile-img' />
                          <img className='usdt-img' src="images/usdt.png" alt="" srcset="" />
                        </div>
                        <p>{pair.CoinInfo.Name} - USD</p>
                      </div>
                      <div className='right-coin'>
                        <p>
                          {pair.DISPLAY?.USD?.PRICE ? pair.DISPLAY.USD.PRICE : 'N/A'}
                        </p>
                        <p className='green'>
                          {pair.DISPLAY?.USD?.CHANGEPCT24HOUR ? pair.DISPLAY.USD.CHANGEPCT24HOUR : 'N/A'}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
          <ul>
            {filteredPairs.map(pair => (
              <li key={`${pair.CoinInfo.Id}_${pair.DISPLAY?.USD?.TOSYMBOL}`} onClick={() => handleSelectCrypto(pair)}>
                <strong>{pair.CoinInfo.Name} - {pair.DISPLAY?.USD?.TOSYMBOL}</strong>
                <br />
                Price: {pair.DISPLAY?.USD?.PRICE ? pair.DISPLAY.USD.PRICE : 'N/A'}
                <br />
                Volume: {pair.DISPLAY?.USD?.VOLUME24HOUR ? pair.DISPLAY.USD.VOLUME24HOUR : 'N/A'}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TradingPairs;
