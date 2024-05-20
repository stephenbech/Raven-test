document.addEventListener('DOMContentLoaded', function() {
  // Task 2.1: Filter trading pairs list
  const searchBar = document.getElementById('search-bar');
  const tradingPairsList = document.getElementById('trading-pairs-list');

  if (searchBar) {
      searchBar.addEventListener('input', function() {
          const filter = searchBar.value.toLowerCase();
          const pairs = tradingPairsList.getElementsByTagName('li');

          for (let i = 0; i < pairs.length; i++) {
              const pair = pairs[i].innerText.toLowerCase();
              if (pair.includes(filter)) {
                  pairs[i].style.display = '';
              } else {
                  pairs[i].style.display = 'none';
              }
          }
      });
  }

  // Task 2.2: Update order form fields
  function updateOrderTotal(priceInputId, amountInputId, totalInputId) {
      const priceInput = document.getElementById(priceInputId);
      const amountInput = document.getElementById(amountInputId);
      const totalInput = document.getElementById(totalInputId);

      function calculateTotal() {
          const price = parseFloat(priceInput.value) || 0;
          const amount = parseFloat(amountInput.value) || 0;
          totalInput.value = (price * amount).toFixed(2);
      }

      if (priceInput && amountInput) {
          priceInput.addEventListener('input', calculateTotal);
          amountInput.addEventListener('input', calculateTotal);
      }
  }

  updateOrderTotal('buy-price', 'buy-amount', 'buy-total');
  updateOrderTotal('sell-price', 'sell-amount', 'sell-total');

  // Task 2.3: Switch between different time intervals for the candlestick chart
  const chartContainer = document.getElementById('chart-container');
  if (chartContainer) {
      const chart = LightweightCharts.createChart(chartContainer, {
          width: chartContainer.clientWidth,
          height: 300,
      });

      const candlestickSeries = chart.addCandlestickSeries();

      // Dummy data for the candlestick chart
      const dummyData = [
          { time: '2023-04-11', open: 70, high: 80, low: 50, close: 60 },
          { time: '2023-04-12', open: 60, high: 90, low: 50, close: 80 },
          { time: '2023-04-13', open: 80, high: 100, low: 70, close: 90 },
          { time: '2023-04-14', open: 90, high: 110, low: 80, close: 100 },
          { time: '2023-04-15', open: 100, high: 120, low: 90, close: 110 },
      ];

      candlestickSeries.setData(dummyData);

      const intervals = ['1m', '5m', '15m', '1h'];
      const chartIntervalButtons = document.getElementById('chart-interval-buttons');

      intervals.forEach(interval => {
          const button = document.createElement('button');
          button.innerText = interval;
          button.addEventListener('click', () => {
              // Functionality to update the chart based on the selected interval
              console.log(`Chart updated to ${interval} interval`);
              // Update the chart data based on the selected interval here
          });
          chartIntervalButtons.appendChild(button);
      });
  }

  // Dummy trading pairs data (replace with actual data fetching)
  const dummyTradingPairs = ['BTC/USD', 'ETH/USD', 'XRP/USD', 'LTC/USD'];
  dummyTradingPairs.forEach(pair => {
      const listItem = document.createElement('li');
      listItem.innerText = pair;
      tradingPairsList.appendChild(listItem);
  });

  // Example of how to populate the order book with dummy data
  const bids = [
      { price: '50000', amount: '0.5', total: '25000' },
      { price: '49500', amount: '1', total: '49500' },
      { price: '49000', amount: '2', total: '98000' },
  ];

  const asks = [
      { price: '51000', amount: '0.5', total: '25500' },
      { price: '51500', amount: '1', total: '51500' },
      { price: '52000', amount: '2', total: '104000' },
  ];

  function populateOrderBook(entries, containerId) {
      const container = document.getElementById(containerId);
      container.innerHTML = '';

      entries.forEach(entry => {
          const entryDiv = document.createElement('div');
          entryDiv.innerHTML = `
              <span>${entry.price}</span>
              <span>${entry.amount}</span>
              <span>${entry.total}</span>
          `;
          container.appendChild(entryDiv);
      });
  }

  populateOrderBook(bids, 'bids');
  populateOrderBook(asks, 'asks');
});
