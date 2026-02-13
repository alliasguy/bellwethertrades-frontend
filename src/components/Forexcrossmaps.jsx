import { useEffect, useRef } from "react";

const Forexcrossmaps = () => {
  const containerRef = useRef(null);
  const scriptRef = useRef(null);

  useEffect(() => {
    if (scriptRef.current) return; // Prevent multiple script insertions

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-forex-cross-rates.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      width: "100%",
      height: "100%",
      currencies: ["EUR", "USD", "JPY", "GBP", "CHF", "AUD", "CAD", "NZD"],
      isTransparent: false,
      colorTheme: "dark",
      locale: "en",
      backgroundColor: "#000000"
    });

    if (containerRef.current) {
      containerRef.current.appendChild(script);
      scriptRef.current = script;
    }
  }, []);

  return (
    <div className="tradingview-widget-container" ref={containerRef} data-aos="fade-up">
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
      </div>
    </div>
  );
};

export default Forexcrossmaps;
