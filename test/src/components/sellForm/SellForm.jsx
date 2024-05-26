import React from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { CiCircleInfo } from 'react-icons/ci';
import { FaChevronDown } from 'react-icons/fa';
import Globe from '../globe/Globe';

const SellForm = ({
  limit2,
  handleLimitItemClick2,
  sellPrice,
  setSellPrice,
  sellAmount,
  setSellAmount,
  sellTotal,
  selectedOption,
  setIsOpen,
  isOpen,
  options,
  handleOptionClick,
  dropdownRef,
  triggerSellPrice,
  setTriggerSellPrice,
  limitSellPrice,
  setLimitSellPrice,
  limitSellAmount,
  setLimitSellAmount,
  limitSellTotal,
  marketSellAmount,
  setMarketSellAmount,
  marketSellTotal
}) => {
  return (
    <TabGroup>
      <TabList className="segment2">
        <Tab onClick={() => handleLimitItemClick2('LIMIT')} className={` ${limit2 === 'LIMIT' ? 'limit' : ' market'}`}>Limit</Tab>
        <Tab onClick={() => handleLimitItemClick2('MARKET')} className={` ${limit2 === 'MARKET' ? 'limit' : ' market'}`}>Market</Tab>
        <Tab onClick={() => handleLimitItemClick2('STOP')} className={` ${limit2 === 'STOP' ? 'limit' : ' market'}`}>Stop-Limit</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <div className="forms">
            <form id="buy-form">
              <div className="price">
                <p> <span> Limit Price</span> <CiCircleInfo /> </p>
                <input type="text" id="buy-price" placeholder="0.00 USD" value={sellPrice} onChange={(e) => setSellPrice(e.target.value)} />
              </div>
              <div className="price">
                <p> <span> Amount</span> <CiCircleInfo /> </p>
                <input type="text" id="buy-Amount" placeholder="0.00 USD" value={sellAmount} onChange={(e) => setSellAmount(e.target.value)} />
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
                <input type="text" id="buy-total" placeholder="Total" value={sellTotal} readOnly />
              </div>
              <button type="submit">Sell BTC</button>
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
                <input type="text" id="buy-Amount" placeholder="0.00 USD" value={marketSellAmount} onChange={(e) => setMarketSellAmount(e.target.value)} />
              </div>
              <div className="total">
                <p>Total</p>
                <input type="text" id="buy-total" placeholder="Total" value={marketSellTotal} readOnly />
              </div>
              <button type="submit">Sell BTC</button>
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
                <input type="text" id="buy-price" placeholder="0.00 USD" value={triggerSellPrice} onChange={(e) => setTriggerSellPrice(e.target.value)} />
              </div>
              <div className="price">
                <p><span>Limit Price</span><CiCircleInfo /></p>
                <input type="text" id="buy-price" placeholder="0.00 USD" value={limitSellPrice} onChange={(e) => setLimitSellPrice(e.target.value)} />
              </div>
              <div className="price">
                <p><span>Amount</span><CiCircleInfo /></p>
                <input type="text" id="Sell-Amount" placeholder="0.00 USD" value={limitSellAmount} onChange={(e) => setLimitSellAmount(e.target.value)} />
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
                <input type="text" id="Sell-total" placeholder="Total" value={limitSellTotal} readOnly />
              </div>
              <button type="submit">Sell BTC</button>
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

export default SellForm;
