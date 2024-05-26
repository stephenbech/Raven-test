import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './OrderBook.css';
import { CiCircleInfo } from 'react-icons/ci';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { FaArrowUpLong } from 'react-icons/fa6';
import {css} from '@emotion/react'

// const highlightedStyle = css`
//   background-color: yellow !important;
// `;

// const normalStyle = css`
//   background-color: lightgrey;
// `;

const OrderBook = ({ selectedCrypto }) => {
  const [orderBook, setOrderBook] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  const [selectedOption, setSelectedOption] = useState(options[9]);
  const [activeMenuItem, setActiveMenuItem] = useState('FRAME1');
  const [highlighted, setHighlighted] = useState(true);
  const [highlighted2, setHighlighted2] = useState(false);
  const [highlighted3, setHighlighted3] = useState(false);

  const handleHighlight = () => {
    setHighlighted(!highlighted);
  };
  const handleHighlight2 = () => {
    setHighlighted2(!highlighted2);
  };
  const handleHighlight3 = () => {
    setHighlighted3(!highlighted3);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchOrderBook = async () => {
      try {
        const response = await axios.get(
          `https://min-api.cryptocompare.com/data/top/exchanges/full?fsym=${selectedCrypto.CoinInfo.Name}&tsym=USD`,
          {
            headers: {
              authorization: `Apikey ${process.env.REACT_APP_API_KEY}`,
            },
          }
        );
        console.log('Order Book API Response:', response.data);
        setOrderBook(response.data);
      } catch (error) {
        console.error('Error fetching order book:', error);
      }
    };

    if (selectedCrypto) {
      fetchOrderBook();
    }
  }, [selectedCrypto]);

  const formatNumber = (num) => {
    if (!num) return 'N/A';
    const formattedNum = Number(num).toPrecision(7);
    return Number(formattedNum).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  if (!orderBook) {
    return <div>Loading order book...</div>;
  }

  const exchangesLength = orderBook.Data.Exchanges.length;

  const handleItemClick = (frame) => {
    setActiveMenuItem(frame);
    setHighlighted(frame === 'FRAME1');
    setHighlighted2(frame === 'FRAME2');
    setHighlighted3(frame === 'FRAME3');
  };

  return (
    <div className="order-book">
      <div>
        <div className="fig">
          <div className='frames'>
            <div 
              className={`${activeMenuItem === 'FRAME1' ? 'frame2' : 'frame'}`} 
              onClick={() => handleItemClick('FRAME1')}
            >
              <img src="images/frame3.png" alt="" />
            </div>
            <div 
              className={`${activeMenuItem === 'FRAME2' ? 'frame2' : 'frame'}`} 
              onClick={() => handleItemClick('FRAME2')}
            >
              <img src="images/frame2.png" alt="" />
            </div>
            <div 
              className={`${activeMenuItem === 'FRAME3' ? 'frame2' : 'frame'}`} 
              onClick={() => handleItemClick('FRAME3')}
            >
              <img src="images/frame1.png" alt="" />
            </div>
          </div>
          <div className="int-select-wrapper" ref={dropdownRef}>
            <div className="int-select">
              <div className="int-select-trigger" onClick={() => setIsOpen(!isOpen)}>
                {selectedOption}
                <FaChevronDown style={{ width: "12px", height: "12px" }} />
              </div>
              {isOpen && (
                <div className="int-options">
                  {options.map((option) => (
                    <span key={option} className={`int-option ${selectedOption === option ? 'selected' : ''}`} onClick={() => handleOptionClick(option)}>
                      {option}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='coin-info'>
        <p>Price <br/> (USDT) </p>
        <p className='second'>Amounts <br/> ({selectedCrypto.CoinInfo.Name}) </p>
        <p>Total</p>
      </div>
      <div className="order-book-data">
        {orderBook.Data.AggregatedData && (
          <div className="aggregated-data">
            <p className="price-up">{formatNumber(orderBook.Data.AggregatedData.PRICE)}</p>
            <p>{formatNumber(orderBook.Data.AggregatedData.HIGH24HOUR)}</p>
            <p>{formatNumber(orderBook.Data.AggregatedData.LOW24HOUR)}</p>
            <p>{formatNumber(orderBook.Data.AggregatedData.CHANGE24HOUR)}</p>
            <p>{formatNumber(orderBook.Data.AggregatedData.VOLUME24HOURTO)}</p>
          </div>
        )}
        {orderBook.Data.Exchanges && exchangesLength > 0 && (
          <div className="exchanges">
            {orderBook.Data.Exchanges.slice(0, 2).map((exchange, index) => (
              <div  key={index}
                // css={highlighted ? highlightedStyle : normalStyle}
                className={`exchange `}
              >
                <p className={` ${highlighted ? 'highlighted' : ''} ${highlighted2 ? 'highlighte' : ''} ${highlighted3 ? 'highlighted' : ''}`}>{formatNumber(exchange.PRICE)}</p>
                <p>{formatNumber(exchange.HIGH24HOUR)}</p>
                <p className={` ${highlighted ? 'highlighted' : ''} ${highlighted2 ? 'highlighte' : ''} ${highlighted3 ? 'highlighted' : ''}`}>{formatNumber(exchange.LOW24HOUR)}</p>
                <p>{formatNumber(exchange.CHANGE24HOUR)}</p>
                <p className={` ${highlighted ? 'highlighted' : ''} ${highlighted2 ? 'highlighte' : ''} ${highlighted3 ? 'highlighted' : ''}`}>{formatNumber(exchange.VOLUME24HOURTO)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        {orderBook.Data.Exchanges && exchangesLength > 2 && (
          <div className="exchanges" style={{padding: "0px 10px",  }}>
            {orderBook.Data.Exchanges.slice(exchangesLength - 2, exchangesLength).map((exchange, index) => (
              <div key={index} className="exchange2">
                <p style={{ fontSize: "16px" }}>{formatNumber(exchange.VOLUME24HOURTO)}</p>
               
              </div>
            ))}
             <FaArrowUpLong className='arrow'/>
          </div>
        )}
      </div>
      <div>
        {orderBook.Data.Exchanges && exchangesLength > 2 && (
          <div className="exchanges">
            {orderBook.Data.Exchanges.slice(exchangesLength - 3, exchangesLength).map((exchange, index) => (
              <div key={index} className="exchange2">
                <p className={` ${highlighted ? 'highlighted2' : ''} ${highlighted2 ? 'highlighted2' : ''} ${highlighted3 ? 'highlighte' : ''}`}>{formatNumber(exchange.PRICE)}</p>
                <p>{formatNumber(exchange.HIGH24HOUR)}</p>
                <p className={` ${highlighted ? 'highlighted2' : ''} ${highlighted2 ? 'highlighted2' : ''} ${highlighted3 ? 'highlighte' : ''}`}>{formatNumber(exchange.LOW24HOUR)}</p>
                <p>{formatNumber(exchange.CHANGE24HOUR)}</p>
                <p className={` ${highlighted ? 'highlighted2' : ''} ${highlighted2 ? 'highlighted2' : ''} ${highlighted3 ? 'highlighte' : ''}`}>{formatNumber(exchange.VOLUME24HOURTO)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderBook;




