import React, { useState, useEffect, useRef } from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import "./OrderSection.css"
import BuyForm from '../buyForm/BuyForm';
import SellForm from '../sellForm/SellForm';

const OrderSection = () => {
  const [activeMenuItem, setActiveMenuItem] = useState('BUY');
  const [limit, setLimit] = useState('LIMIT');
  const [limit2, setLimit2] = useState('LIMIT');
  const [buyPrice, setBuyPrice] = useState('0.00 USD');
  const [buyAmount, setBuyAmount] = useState('0.00 USD');
  const [buyTotal, setBuyTotal] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [sellAmount, setSellAmount] = useState('');
  const [sellTotal, setSellTotal] = useState('');
  const [marketAmount, setMarketAmount] = useState('0.00 USD');
  const [marketTotal, setMarketTotal] = useState('');
  const [limitBuyPrice, setLimitBuyPrice] = useState('0.00 USD');
  const [limitBuyAmount, setLimitBuyAmount] = useState('0.00 USD');
  const [limitBuyTotal, setLimitBuyTotal] = useState('');
  const [triggerPrice, setTriggerPrice] = useState("0.00 USD")
  const [marketSellAmount, setMarketSellAmount] = useState("0.00 USD")
  const [marketSellTotal, setMarketSellTotal] = useState("")
  const [limitSellPrice, setLimitSellPrice] = useState('0.00 USD');
  const [limitSellAmount, setLimitSellAmount] = useState('0.00 USD');
  const [limitSellTotal, setLimitSellTotal] = useState('');
  const [triggerSellPrice, setTriggerSellPrice] = useState("0.00 USD")

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const options = ['Fill or Kill', 'Good till cancelled', 'Good till date'];
  const [selectedOption, setSelectedOption] = useState(options[1]);

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
    setBuyTotal((parseFloat(buyPrice) * parseFloat(buyAmount)).toFixed(2));
  }, [buyPrice, buyAmount]);

  useEffect(() => {
    setSellTotal((parseFloat(sellPrice) * parseFloat(sellAmount)).toFixed(2));
  }, [sellPrice, sellAmount]);

  useEffect(() => {
    setMarketTotal((parseFloat(marketAmount)).toFixed(2));
  }, [marketAmount]);

  useEffect(() => {
    setLimitBuyTotal((parseFloat(triggerPrice) * parseFloat(limitBuyPrice) * parseFloat(limitBuyAmount)).toFixed(2));
  }, [triggerPrice, limitBuyPrice, limitBuyAmount])

  useEffect(() => {
    setMarketSellTotal((parseFloat(marketSellAmount)).toFixed(2));
  }, [marketSellAmount])

  useEffect(() => {
    setLimitSellTotal((parseFloat(triggerSellPrice) * parseFloat(limitSellPrice) * parseFloat(limitSellAmount)).toFixed(2));
  }, [triggerSellPrice, limitSellPrice, limitSellAmount])

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };
  const handleLimitItemClick = (limitItem) => {
    setLimit(limitItem);
  };
  const handleLimitItemClick2 = (limitItem) => {
    setLimit2(limitItem);
  };

  return (
    <section className="order-section">
      <TabGroup>
        <TabList className="segment">
          <Tab onClick={() => handleMenuItemClick('BUY')} className={`  
            ${activeMenuItem === 'BUY' ? 'buy' : ' sell'}
          `}>BUY</Tab>
          <Tab onClick={() => handleMenuItemClick('SELL')} className={`  
            ${activeMenuItem === 'SELL' ? 'buy2' : ' sell'}
          `} >SELL</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <BuyForm
              limit={limit}
              handleLimitItemClick={handleLimitItemClick}
              buyPrice={buyPrice}
              setBuyPrice={setBuyPrice}
              buyAmount={buyAmount}
              setBuyAmount={setBuyAmount}
              buyTotal={buyTotal}
              selectedOption={selectedOption}
              setIsOpen={setIsOpen}
              isOpen={isOpen}
              options={options}
              handleOptionClick={handleOptionClick}
              dropdownRef={dropdownRef}
              triggerPrice={triggerPrice}
              setTriggerPrice={setTriggerPrice}
              limitBuyPrice={limitBuyPrice}
              setLimitBuyPrice={setLimitBuyPrice}
              limitBuyAmount={limitBuyAmount}
              setLimitBuyAmount={setLimitBuyAmount}
              limitBuyTotal={limitBuyTotal}
              marketAmount={marketAmount}
              setMarketAmount={setMarketAmount}
              marketTotal={marketTotal}
            />
          </TabPanel>
          <TabPanel>
            <SellForm
              limit2={limit2}
              handleLimitItemClick2={handleLimitItemClick2}
              sellPrice={sellPrice}
              setSellPrice={setSellPrice}
              sellAmount={sellAmount}
              setSellAmount={setSellAmount}
              sellTotal={sellTotal}
              selectedOption={selectedOption}
              setIsOpen={setIsOpen}
              isOpen={isOpen}
              options={options}
              handleOptionClick={handleOptionClick}
              dropdownRef={dropdownRef}
              triggerSellPrice={triggerSellPrice}
              setTriggerSellPrice={setTriggerSellPrice}
              limitSellPrice={limitSellPrice}
              setLimitSellPrice={setLimitSellPrice}
              limitSellAmount={limitSellAmount}
              setLimitSellAmount={setLimitSellAmount}
              limitSellTotal={limitSellTotal}
              marketSellAmount={marketSellAmount}
              setMarketSellAmount={setMarketSellAmount}
              marketSellTotal={marketSellTotal}
            />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </section>
  );
};

export default OrderSection;
