import React, { useState, useEffect, useRef } from 'react';
import TradingPairs from '../tradingPairs/TradingPairs';
import OrderBook from '../orderBook/OrderBook';
import Chart from '../chart/Chart';
import "./ChartList.css";
import OrderSection from '../orderSection/OrderSection';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import Open from '../open/Open';

const ChartList = () => {
  const isSmallScreen = window.innerWidth <= 768;
  const [selectedPair, setSelectedPair] = useState({ base: 'BTC', target: 'USD' });
  const [interval, setInterval] = useState('1m');
  const [activeMenuItem, setActiveMenuItem] = useState(isSmallScreen ? 'CHARTS' : 'ORDER');
  const [isOrderSectionVisible, setIsOrderSectionVisible] = useState(false);
  const orderSectionRef = useRef(null);

  const handleSelectPair = (pair) => {
    setSelectedPair(pair);
  };

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };

  const handleBuySellClick = () => {
    setIsOrderSectionVisible(true);
  };

  const handleClickOutside = (event) => {
    if (orderSectionRef.current && !orderSectionRef.current.contains(event.target)) {
      setIsOrderSectionVisible(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768 && activeMenuItem !== 'CHARTS') {
        setActiveMenuItem('CHARTS');
      } else if (window.innerWidth > 768 && activeMenuItem !== 'ORDER') {
        setActiveMenuItem('ORDER');
      }
    };
    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeMenuItem]);

  useEffect(() => {
    if (isSmallScreen) {
      setActiveMenuItem('CHARTS');
    } else {
      setActiveMenuItem('ORDER');
    }
  }, [isSmallScreen]);

  return (
    <div className="chart-list">
      <TradingPairs onSelectPair={handleSelectPair} />
      <div className='group1'>
        <div className='group2'>
          <div className='unchart'>
            <div className='charted'>
              <Chart tradingPair={selectedPair} interval={interval} setInterval={setInterval} />
            </div>
            <div className="tab-group">
              <TabGroup selectedIndex={activeMenuItem === 'CHARTS' ? 0 : 1}>
                <TabList className="tab-list">
                  {isSmallScreen && (
                    <Tab onClick={() => handleMenuItemClick('CHARTS')} className={`${activeMenuItem === 'CHARTS' ? 'tab1' : 'tab2'}`}>Charts</Tab>
                  )}
                  <Tab onClick={() => handleMenuItemClick('ORDER')} className={`${activeMenuItem === 'ORDER' ? 'tab1' : 'tab2'}`}>Order Book</Tab>
                  <Tab disabled className="tab2">Recent Trades</Tab>
                </TabList>
                <TabPanels>
                  {isSmallScreen && activeMenuItem === 'CHARTS' && (
                    <TabPanel className="charter">
                      <Chart tradingPair={selectedPair} interval={interval} setInterval={setInterval} />
                    </TabPanel>
                  )}
                  {activeMenuItem === 'ORDER' && (
                    <TabPanel>
                      <OrderBook selectedCrypto={selectedPair} />
                    </TabPanel>
                  )}
                </TabPanels>
              </TabGroup>
            </div>
          </div>
          <div className="break">
            <div className="tab-group">
              <TabGroup selectedIndex={activeMenuItem === 'CHARTS' ? 0 : 1}>
                <TabList className="tab-list">
                  {isSmallScreen && (
                    <Tab onClick={() => handleMenuItemClick('CHARTS')} className={`${activeMenuItem === 'CHARTS' ? 'tab1' : 'tab2'}`}>Charts</Tab>
                  )}
                  <Tab onClick={() => handleMenuItemClick('ORDER')} className={`${activeMenuItem === 'ORDER' ? 'tab1' : 'tab2'}`}>Order Book</Tab>
                  <Tab disabled className="tab2">Recent Trades</Tab>
                </TabList>
                <TabPanels>
                  {isSmallScreen && activeMenuItem === 'CHARTS' && (
                    <TabPanel className="charter">
                      <Chart tradingPair={selectedPair} interval={interval} setInterval={setInterval} />
                    </TabPanel>
                  )}
                  {activeMenuItem === 'ORDER' && (
                    <TabPanel>
                      <OrderBook selectedCrypto={selectedPair} />
                    </TabPanel>
                  )}
                </TabPanels>
              </TabGroup>
            </div>
            <OrderSection />
          </div>
          <div>
            <div className="slide">
              <button className='slide-buy' onClick={handleBuySellClick}>
                Buy
              </button>
              <button className='slide-sell' onClick={handleBuySellClick}>
                Sell
              </button>
            </div>
            <Open />
          </div>
        </div>
        <div>
          <div ref={orderSectionRef} className={`order-section-wrapper ${isOrderSectionVisible ? 'visible' : ''}`}>
            <OrderSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartList;
