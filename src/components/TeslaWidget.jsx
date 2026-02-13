// TeslaWidget.jsx
import React, { useEffect, useRef, memo } from 'react';

const TeslaWidget = () => {
  const containerRef = useRef(null);
  const scriptAdded = useRef(false);

  useEffect(() => {
    if (!scriptAdded.current) {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "symbols": [
            ["Apple", "AAPL|1D"],
            ["Google", "GOOGL|1D"],
            ["Microsoft", "MSFT|1D"],
            ["CME_MINI:NQ1!|1D"],
            ["COINBASE:BTCUSD|1D"],
            ["TVC:US02Y|1D"],
            ["FX:USDJPY|1D"],
            ["NASDAQ:TSLA|1D"],
            ["NASDAQ:NVDA|1D"],
            ["SP:SPX|1D"],
            ["OPRA:AA250404C22.5|1D"],
            ["BINANCE:ETHUSDT|1D"],
            ["BINANCE:XRPUSDT|1D"],
            ["NASDAQ:TQQQ|1D"],
            ["AMEX:SPY|1D"],
            ["NYSE:BABA|1D"],
            ["PEPPERSTONE:NAS100|1D"]
          ],
          "chartOnly": false,
          "width": "100%",
          "height": "100%",
          "locale": "en",
          "colorTheme": "dark",
          "autosize": false,
          "showVolume": false,
          "showMA": false,
          "hideDateRanges": false,
          "hideMarketStatus": false,
          "hideSymbolLogo": false,
          "scalePosition": "right",
          "scaleMode": "Normal",
          "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
          "fontSize": "10",
          "noTimeScale": false,
          "valuesTracking": "1",
          "changeMode": "price-and-percent",
          "chartType": "area",
          "maLineColor": "#2962FF",
          "maLineWidth": 1,
          "maLength": 9,
          "headerFontSize": "medium",
          "backgroundColor": "rgba(15, 15, 15, 0)",
          "lineWidth": 2,
          "lineType": 0,
          "dateRanges": [
            "1d|1",
            "1m|30",
            "3m|60",
            "12m|1D",
            "60m|1W",
            "all|1M"
          ]
        }`;
      
      if (containerRef.current) {
        containerRef.current.appendChild(script);
        scriptAdded.current = true;
      }
    }
  }, []);

  return (
    <div className="tradingview-widget-container" ref={containerRef}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
      </div>
    </div>
  );
};

export default memo(TeslaWidget);


