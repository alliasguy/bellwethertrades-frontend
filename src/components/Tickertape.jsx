import { useEffect, useRef } from "react";

const Tickertape = () => {
  const containerRef = useRef(null);
  const scriptRef = useRef(null);

  useEffect(() => {
    if (scriptRef.current) return; // Prevent multiple script insertions
    
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: "FOREXCOM:SPXUSD", title: "S&P 500 Index" },
        { proName: "FOREXCOM:NSXUSD", title: "US 100 Cash CFD" },
        { proName: "FX_IDC:EURUSD", title: "EUR to USD" },
        { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
        { proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
        { description: "NVIDIA", proName: "NASDAQ:NVDA" },
        { description: "TESLA", proName: "NASDAQ:TSLA" },
        { description: "EURO/USD", proName: "OANDA:EURUSD" },
        { description: "US100", proName: "CAPITALCOM:US100" }
      ],
      showSymbolLogo: true,
      isTransparent: true,
      displayMode: "regular",
      colorTheme: "dark",
      locale: "en"
    });
    
    if (containerRef.current) {
      containerRef.current.appendChild(script);
      scriptRef.current = script;
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

export default Tickertape;
