// src/components/Chart.js
import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import axios from 'axios';
import './Chart.css';
import { FaChevronDown } from 'react-icons/fa';
import { LuCandlestickChart } from "react-icons/lu";
import { GrRedo, GrUndo } from "react-icons/gr";

const Chart = ({ tradingPair, interval, setInterval }) => {
  const chartContainerRef = useRef();
  const chartRef = useRef();

  useEffect(() => {
    const chartContainer = chartContainerRef.current;
    const chart = createChart(chartContainer, {
      width: chartContainer.clientWidth,
      height: 600,
      layout: {
        background: { type: '', color: '#20252B' },
        textColor: '#D9D9D9',
      },
      grid: {
        vertLines: { color: 'rgba(42, 46, 57, 0.5)' },
        horzLines: { color: 'rgba(42, 46, 57, 0.5)' },
      },
      crosshair: {
        vertLine: {
          color: '#758696',
          width: 0.8,
          style: 0,
          visible: true,
          labelVisible: true,
        },
        horzLine: {
          color: '#758696',
          width: 0.8,
          style: 0,
          visible: true,
          labelVisible: true,
        },
      },
      priceScale: { borderColor: '#555555' },
      timeScale: { borderColor: '#555555' },
    });
    chartRef.current = chart;

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#4CAF50',
      downColor: '#FF5252',
      borderUpColor: '#4CAF50',
      borderDownColor: '#FF5252',
      wickUpColor: '#4CAF50',
      wickDownColor: '#FF5252',
    });

    const volumeSeries = chart.addHistogramSeries({
      color: '#26a69a',
      priceFormat: { type: 'volume' },
      priceScaleId: '',
      scaleMargins: { top: 0.9, bottom: 0.9 },
    });

    const fetchChartData = async () => {
      try {
        const response = await axios.get(
          `https://min-api.cryptocompare.com/data/v2/histominute`,
          {
            params: {
              fsym: tradingPair.CoinInfo.Name.toUpperCase(),
              tsym: 'USD',
              limit: interval === '1m' ? 1440 : interval === '5m' ? 288 : 30,
              aggregate: interval === '1m' ? 1 : interval === '1w' ? 5 : 15,
              api_key: process.env.REACT_APP_API_KEY,
            },
          }
        );
        console.log(response.data.Data)
        if (response.data?.Data?.Data) {
          const formattedData = response.data.Data.Data.map(candle => ({
            time: candle.time,
            open: candle.open,
            high: candle.high,
            low: candle.low,
            close: candle.close,
            volume: candle.volumeto,
          }));

          const candlestickData = formattedData.map(({ time, open, high, low, close }) => ({
            time, open, high, low, close,
          }));

          const volumeData = formattedData.map(({ time, volume, open, close }) => ({
            time,
            value: volume,
            color: close > open ? 'rgba(62, 191, 66, 0.5)' : 'rgba(255, 82, 82, 0.5)',
            borderColor: close > open ? 'rgba(62, 191, 66, 1)' : 'rgba(255, 82, 82, 1)',
          }));

          candlestickSeries.setData(candlestickData);
          volumeSeries.setData(volumeData);
        } else {
          console.error('Invalid response data format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching chart data', error);
      }
    };

    fetchChartData();

    return () => {
      chart.remove();
      chartRef.current = null;
    };
  }, [tradingPair, interval]);

  return (
    <div className="chart-wrapper">
      <div className="chart-time">
        <div className="chart-interval-buttons">
          <p>Time</p>
          {['1m', '5m', '15m', '1h', '1d', '1w', '1M'].map(time => (
            <button key={time} onClick={() => setInterval(time)}>
              {time}
            </button>
          ))}
          <FaChevronDown/>
          <div className="dividers"></div>
          <LuCandlestickChart style={{width:"20px", height: "20px"}} />
          <div className="dividers"></div>
          <p>FXindicators</p>
          <div className="dividers"></div>
          <GrUndo />
          <GrRedo />
        
        </div>
      </div>
      <div ref={chartContainerRef} className="chart-container"></div>
    </div>
  );
};

export default Chart;
