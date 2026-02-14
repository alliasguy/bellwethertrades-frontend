import React from 'react'
import './futures.css'
import Xrpwidget from '../../components/Xrpwidget'
import Header from '../../components/Header/Header'
import Contact from '../../components/contact/Contact'
import Footer from '../../components/footer/Footer'
import CryptoOverview from '../../components/CryptoOverview'
import Futurewidget from '../../components/Futurewidget'
import Solanawidget from '../../components/Solanawidget'
import { useNavigate } from 'react-router-dom'
const Futures = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className='forex-page-section'>
        <Header />
      <div className="forex-page-wrapper">
        <div className="videoframe-text-container" data-aos="fade-up">
          <h1><span className="highlight">futures </span></h1>
        </div>
        <div className="forex-hero-section">
          <video src="/widgets-main-video.hvc1.3010a527240f8051d301.mp4" className="forex-page-video" autoPlay='true' loop='true'></video>
          <div className="floating-widget-right">
              <Solanawidget />
          </div>
          <div className="floating-widget-left">
              <Xrpwidget />
          </div>
          </div>
          
        </div>
        <section className='trading-view-forex-section' data-aos="fade-up">
                    <div className="videoframe-text-container">
                      <h1>crypto <span className="highlight">futures</span> markets </h1>
                    </div>
                  <div className="trading-view-forex-wrapper">
                      <div className="trading-view-card">
                          <div className="trading-view-card-text-container" >
                              <h1>Cryptocurrency Market</h1>
                              <p>This widget displays crypto assets and then sorts them by their market capitalization.</p>
                          </div>
                          <Futurewidget />
                      </div>
                      <div className="trading-view-card">
                          <div className="trading-view-card-text-container" >
                              <h1>Crypto Screener</h1>
                              <p>Separate the wheat from the chaff with this embeddable Screener – handy for sorting symbols both by fundamental and technical indicators.</p>
                          </div>
                          <CryptoOverview />
                      </div>
                  </div>
            </section>
      </div>
      <Contact />
      <Footer />
      </>
  )
}

export default Futures