import React, {useState, useEffect} from 'react';
import ChartList from '../components/chartList/ChartList';
import OrderBook from '../components/orderBook/OrderBook';
import OrderSection from '../components/orderSection/OrderSection';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import axios from 'axios';
const MainContent = () => {
  const [selectedPair, setSelectedPair] = useState(null);
  const [candlestickData, setCandlestickData] = useState([]);
  const [timeInterval, setTimeInterval] = useState('1m');

  useEffect(() => {
    if (selectedPair) {
      fetchCandlestickData(selectedPair, timeInterval);
    }
  }, [selectedPair, timeInterval]);

  const fetchCandlestickData = async (pair, interval) => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${pair.base}/market_chart`,
        {
          params: {
            vs_currency: pair.target,
            days: interval, // Adjust as per your requirement
          },
        }
      );
      const data = response.data.prices.map((price) => ({
        time: new Date(price[0]).toISOString().split('T')[0],
        open: price[1],
        high: price[1],
        low: price[1],
        close: price[1],
      }));
      setCandlestickData(data);
    } catch (error) {
      console.error('Error fetching candlestick data:', error);
    }
  };

  const handlePairSelect = (pair) => {
    setSelectedPair(pair);
  };

  return (
    <div>
      <Header />
      <main id="main-content">
        <ChartList onSelectPair={handlePairSelect}  data={candlestickData} onIntervalChange={setTimeInterval} />
      </main>
      <Footer/>
    </div>
  );
};

export default MainContent;
