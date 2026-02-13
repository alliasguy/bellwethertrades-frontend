import React, { useEffect, useRef } from 'react';

const TradingViewWidget = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: 'OANDA:XAUUSD', // ✅ Default: Gold/USD
      timezone: 'Etc/UTC',
      theme: 'dark',
      style: '1',
      locale: 'en',
      backgroundColor: 'rgba(0, 0, 0, 1)',
      withdateranges: true,
      range: 'YTD',
      hide_side_toolbar: false,
      allow_symbol_change: true,
      watchlist: [
        // 🔹 Forex majors
        'OANDA:XAUUSD',  // Gold/USD (default)
        'FX:EURUSD',     // Euro/USD
        'OANDA:GBPUSD',  // Pound/USD
        'OANDA:USDJPY',  // Dollar/Yen
        'CAPITALCOM:USDCAD', // Dollar/Canadian
        'OANDA:AUDUSD',  // Aussie/USD
        'OANDA:NZDUSD',  // Kiwi/USD
        'OANDA:USDCHF',  // Dollar/Swiss
        'OANDA:EURGBP',  // Euro/Pound
        'OANDA:EURJPY',  // Euro/Yen

        // 🔹 Cryptos
        'BINANCE:BTCUSDT', // Bitcoin/USDT
        'BINANCE:ETHUSDT', // Ethereum/USDT
        'BINANCE:XRPUSDT', // Ripple/USDT

        // 🔹 Indices
        'CAPITALCOM:SPX500', // S&P 500
        'CAPITALCOM:NAS100', // Nasdaq 100
        'CAPITALCOM:DAX40',  // Germany DAX
      ],
      compareSymbols: [],
      details: true,
      hotlist: true,
      studies: ['STD;24h%Volume', 'STD;Arnaud%1Legoux%1Moving%1Average'],
      show_popup_button: true,
      popup_width: '1000',
      popup_height: '650',
      support_host: 'https://www.tradingview.com',
    });

    containerRef.current.appendChild(script);
  }, []);

  return (
    <div className="tradingview-widget-container" style={{ height: '100%', width: '100%' }}>
      <div
        className="tradingview-widget-container__widget"
        ref={containerRef}
        style={{ height: '100%', width: '100%' }}
      />
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  );
};

export default React.memo(TradingViewWidget);
