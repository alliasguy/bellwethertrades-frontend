import './forex.css'
import TradingViewWidget from '../../components/TradingViewWidget'
import MiniSymbolOverviewWidget from '../../components/MiniSymbolOverviewWidget'
import Header from '../../components/Header/Header'
import Contact from '../../components/contact/Contact'
import Footer from '../../components/footer/Footer'
import Forexheatmap from '../../components/Forexheatmap'
import Forexcrossmaps from '../../components/Forexcrossmaps'
import { useNavigate } from 'react-router-dom'
const Forex = () => {
    const navigate = useNavigate()
  return (
    <>
      <div className='forex-page-section'>
        <Header />
      <div className="forex-page-wrapper">
        <div className="videoframe-text-container" data-aos="fade-up">
          <h1><span className="highlight">forex </span></h1>
        </div>
        <div className="forex-hero-section">
          <video src="/chart-big.hvc1.6af4110d38611a03c3a4.mp4" className="forex-page-video" autoPlay='true' loop='true'></video>
          <div className="floating-widget-right" data-aos="fade-up">
              <MiniSymbolOverviewWidget />
          </div>
          <div className="floating-widget-left" data-aos="fade-up">
              <TradingViewWidget />
          </div>
          </div>
          
        </div>
        <section className='trading-view-forex-section' data-aos="fade-up">
                    <div className="videoframe-text-container">
                      <h1><span className="highlight">Forex</span> maps </h1>
                    </div>
                  <div className="trading-view-forex-wrapper">
                      <div className="trading-view-card">
                          <div className="trading-view-card-text-container">
                              <h1>Forex Cross Rates</h1>
                              <p>This one allows you to display real-time quotes of selected currencies in comparison to other major currencies.</p>
                          </div>
                          <Forexcrossmaps />
                      </div>
                      <div className="trading-view-card">
                          <div className="trading-view-card-text-container">
                              <h1>Forex Heatmap</h1>
                              <p>Showcase a snapshot of currency market action. This widget lets you spot strong and weak currencies and see how they compare to each other, all in real-time.</p>
                          </div>
                          <Forexheatmap />
                      </div>
                  </div>
            </section>
      </div>
      <Contact />
      <Footer />
      </>
  )
}

export default Forex