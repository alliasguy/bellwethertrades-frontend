import { useEffect, useRef } from "react";

const Economiceventswidget = () => {
  const containerRef = useRef(null);
  const scriptAdded = useRef(false);

  useEffect(() => {
    if (!scriptAdded.current) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-events.js";
      script.innerHTML = JSON.stringify({
        width: "100%",
        height: "100%",
        colorTheme: "dark",
        isTransparent: true,
        locale: "en",
        importanceFilter: "0,1",
        countryFilter: "ar,au,br,ca,cn,fr,de,in,id,it,jp,kr,mx,ru,sa,za,tr,gb,us,eu"
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

export default Economiceventswidget;

