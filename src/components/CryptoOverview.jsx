import { useEffect, useRef } from "react";

const CryptoOverview = () => {
  const containerRef = useRef(null);
  const scriptAdded = useRef(false);

  useEffect(() => {
    if (!scriptAdded.current) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-screener.js";
      script.innerHTML = JSON.stringify({
        width: "100%",
        height: "100%",
        defaultColumn: "overview",
        defaultScreen: "general",
        market: "crypto",
        showToolbar: true,
        colorTheme: "dark",
        locale: "en"
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

export default CryptoOverview;
