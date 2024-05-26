import React from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { CiCircleInfo } from 'react-icons/ci';
import { FaChevronDown } from 'react-icons/fa';
import Globe from '../globe/Globe';

const BuyForm = ({
  limit,
  handleLimitItemClick,
  buyPrice,
  setBuyPrice,
  buyAmount,
  setBuyAmount,
  buyTotal,
  selectedOption,
  setIsOpen,
  isOpen,
  options,
  handleOptionClick,
  dropdownRef,
  triggerPrice,
  setTriggerPrice,
  limitBuyPrice,
  setLimitBuyPrice,
  limitBuyAmount,
  setLimitBuyAmount,
  limitBuyTotal,
  marketAmount,
  setMarketAmount,
  marketTotal
}) => {
  return (
    <TabGroup>
      <TabList className="segment2">
        <Tab onClick={() => handleLimitItemClick('LIMIT')} className={` ${limit === 'LIMIT' ? 'limit' : ' market'}`}>Limit</Tab>
        <Tab onClick={() => handleLimitItemClick('MARKET')} className={` ${limit === 'MARKET' ? 'limit' : ' market'}`}>Market</Tab>
        <Tab onClick={() => handleLimitItemClick('STOP')} className={` ${limit === 'STOP' ? 'limit' : ' market'}`}>Stop-Limit</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <div className="forms">
            <form id="buy-form">
              <div className="price">
                <p> <span> Limit Price</span> <CiCircleInfo /> </p>
                <input type="text" id="buy-price" placeholder="0.00 USD" value={buyPrice} onChange={(e) => setBuyPrice(e.target.value)} />
              </div>
              <div className="price">
                <p> <span> Amount</span> <CiCircleInfo /> </p>
                <input type="text" id="buy-Amount" placeholder="0.00 USD" value={buyAmount} onChange={(e) => setBuyAmount(e.target.value)} />
              </div>
              <div className="price">
                <p> <span> Type</span> <CiCircleInfo /> </p>
                <div className="custom-select-wrapper" ref={dropdownRef}>
                  <div className="custom-select">
                    <div className="custom-select-trigger" onClick={() => setIsOpen(!isOpen)}>
                      {selectedOption}
                      <FaChevronDown style={{ width: "12px", height: "12px" }} />
                    </div>
                    {isOpen && (
                      <div className="custom-options">
                        {options.map((option) => (
                          <span key={option} className={`custom-option ${selectedOption === option ? 'selected' : ''}`} onClick={() => handleOptionClick(option)}>
                            {option}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="post">
                <input className='check' type="checkbox" name="" placeholder='Post nly' id="" />
                <label htmlFor="post"><span>Post Only</span><CiCircleInfo /></label>
              </div>
              <div className="total">
                <p>Total</p>
                <input type="text" id="buy-total" placeholder="Total" value={buyTotal} readOnly />
              </div>
              <button type="submit">Buy BTC</button>
            </form>
            <div>
              <div className="total"> <p>Total account value</p> <Globe /> </div>
              <p className='value'>0.00</p>
            </div>
            <div className='open'>
              <div className='openOrders'>
                <p className=''>Open Orders </p>
                <span>0.00</span>
              </div>
              <div className='openOrders'>
                <p >Available</p>
                <span>0.00 </span>
              </div>
            </div>
            <button className='deposit'>Deposit</button>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="forms">
            <form id="buy-form">
              <div className="price">
                <p><span> Amount</span><CiCircleInfo /></p>
                <input type="text" id="buy-Amount" placeholder="0.00 USD" value={marketAmount} onChange={(e) => setMarketAmount(e.target.value)} />
              </div>
              <div className="total">
                <p>Total</p>
                <input type="text" id="buy-total" placeholder="Total" value={marketTotal} readOnly />
              </div>
              <button type="submit">Buy BTC</button>
            </form>
            <div>
              <div className="total"><p>Total account value</p><Globe /></div>
              <p className='value'>0.00</p>
            </div>
            <div className='open'>
              <div className='openOrders'>
                <p className=''>Open Orders </p>
                <span>0.00</span>
              </div>
              <div className='openOrders'>
                <p >Available</p>
                <span>0.00</span>
              </div>
            </div>
            <button className='deposit'>Deposit</button>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="forms">
            <form id="buy-form">
              <div className="price">
                <p><span>Trigger Price</span><CiCircleInfo /></p>
                <input type="text" id="buy-price" placeholder="0.00 USD" value={triggerPrice} onChange={(e) => setTriggerPrice(e.target.value)} />
              </div>
              <div className="price">
                <p><span>Limit Price</span><CiCircleInfo /></p>
                <input type="text" id="buy-price" placeholder="0.00 USD" value={limitBuyPrice} onChange={(e) => setLimitBuyPrice(e.target.value)} />
              </div>
              <div className="price">
                <p><span>Amount</span><CiCircleInfo /></p>
                <input type="text" id="buy-Amount" placeholder="0.00 USD" value={limitBuyAmount} onChange={(e) => setLimitBuyAmount(e.target.value)} />
              </div>
              <div className="price">
                <p><span>Type</span><CiCircleInfo /></p>
                <div className="custom-select-wrapper" ref={dropdownRef}>
                  <div className="custom-select">
                    <div className="custom-select-trigger" onClick={() => setIsOpen(!isOpen)}>
                      {selectedOption}
                      <FaChevronDown style={{ width: "12px", height: "12px" }} />
                    </div>
                    {isOpen && (
                      <div className="custom-options">
                        {options.map((option) => (
                          <span key={option} className={`custom-option ${selectedOption === option ? 'selected' : ''}`} onClick={() => handleOptionClick(option)}>
                            {option}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="post">
                <input className='check' type="checkbox" name="" placeholder='Post nly' id="" />
                <label htmlFor="post"><span>Post Only</span><CiCircleInfo /></label>
              </div>
              <div className="total">
                <p>Total</p>
                <input type="text" id="buy-total" placeholder="Total" value={limitBuyTotal} readOnly />
              </div>
              <button type="submit">Buy BTC</button>
            </form>
            <div>
              <div className="total"><p>Total account value</p><Globe /></div>
              <p className='value'>0.00</p>
            </div>
            <div className='open'>
              <div className='openOrders'>
                <p className=''>Open Orders </p>
                <span>0.00</span>
              </div>
              <div className='openOrders'>
                <p >Available</p>
                <span>0.00 </span>
              </div>
            </div>
            <button className='deposit'>Deposit</button>
          </div>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
};

export default BuyForm;
