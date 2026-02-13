import { useEffect, useRef } from "react";

const Indicesheatmap = () => {
  const containerRef = useRef(null);
  const scriptAdded = useRef(false);

  useEffect(() => {
    if (!scriptAdded.current) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-forex-heat-map.js";
      script.innerHTML = JSON.stringify({
        width: "100%",
        height: "100%",
        currencies: [
          "SEK",
          "ZAR",
          "MXN",
          "MYR",
          "INR",
          "RUB",
          "ARS",
          "CLP",
          "COP",
          "UYU"
        ],
        isTransparent: true,
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

export default Indicesheatmap;