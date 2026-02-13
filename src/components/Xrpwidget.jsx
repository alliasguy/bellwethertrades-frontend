import { useEffect, useRef } from "react";

const Xrpwidget = () => {
  const containerRef = useRef(null);
  const scriptAdded = useRef(false);

  useEffect(() => {
    if (!scriptAdded.current) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js";
      script.innerHTML = JSON.stringify({
        symbol: "BINANCE:XRPUSDT",
        width: "550",
        locale: "en",
        colorTheme: "dark",
        isTransparent: true
      });
      
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

export default Xrpwidget;
