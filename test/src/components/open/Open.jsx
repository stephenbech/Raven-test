import React, {useState} from 'react'
import './Open.css'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
function Open() {
   
  const [activeMenuItem, setActiveMenuItem] = useState('OPEN');
   const handleOpen = (menuItem) => {
      setActiveMenuItem(menuItem);
    };
  return (
    <div className='open-wrapper'>
      <TabGroup className="opener">
         <div className="over">
            <TabList className="open-list">
            <Tab onClick={() => handleOpen('OPEN')} className={`  
               ${activeMenuItem === 'OPEN' ? 'position' : 'history'}
            `}>Open Orders</Tab>
            <Tab onClick={() => handleOpen('POSITION')} className={`  
               ${activeMenuItem === 'POSITION' ? 'position' : ' history'}
            `} >Positions</Tab>
            <Tab onClick={() => handleOpen('HISTORY')} className={`  
               ${activeMenuItem === 'HISTORY' ? 'position' : ' history'}
            `}>Order History</Tab>
            <Tab onClick={() => handleOpen('TRADE')} className={`  
               ${activeMenuItem === 'TRADE' ? 'position' : ' history'}
            `} >Trade History</Tab>
            </TabList>
         </div>
         <TabPanels className="opened">
            <TabPanel className="open-content">
               <div>
               <h1 className='title'>   No Open Orders</h1>
               <p className='content'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id pulvinar nullam sit imperdiet pulvinar.</p>
               </div>

            </TabPanel>
            <TabPanel className="open-content">
               <div>
               <h1 className='title'>   No Positions</h1>
               <p className='content'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id pulvinar nullam sit imperdiet pulvinar.</p>
               </div>

            </TabPanel>
            <TabPanel className="open-content">
               <div>
               <h1 className='title'>   No Order History</h1>
               <p className='content'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id pulvinar nullam sit imperdiet pulvinar.</p>
               </div>

            </TabPanel>
            <TabPanel className="open-content">
               <div>
               <h1 className='title'>   No Trade History</h1>
               <p className='content'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id pulvinar nullam sit imperdiet pulvinar.</p>
               </div>

            </TabPanel>
         </TabPanels>
      </TabGroup>
    </div>
  )
}

export default Open