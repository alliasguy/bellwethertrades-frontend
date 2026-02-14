import React from 'react'
import './stocks.css'
import Header from '../../components/Header/Header'
import Contact from '../../components/contact/Contact'
import Footer from '../../components/footer/Footer'
import Stocksoverview from '../../components/Stocksoverview'
import Pyplwidget from '../../components/Pyplwidget'
import { useNavigate } from 'react-router-dom'
import Stockwidget from '../../components/Stockwidget'
import Stockscreener from '../../components/Stockscreener'
const Stocks = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className='forex-page-section'>
        <Header />
      <div className="forex-page-wrapper">
        <div className="videoframe-text-container" data-aos="fade-up">
          <h1><span className="highlight">Stocks </span></h1>
        </div>
        <div className="forex-hero-section">
          <video src="/widgets-main-video.hvc1.3010a527240f8051d301.mp4" className="forex-page-video" autoPlay='true' loop='true'></video>
          <div className="floating-widget-right">
              <Stockwidget />
          </div>
          <div className="floating-widget-left">
              <Pyplwidget />
          </div>
          </div>
          
        </div>
        <section className='trading-view-forex-section' data-aos="fade-up">
                    <div className="videoframe-text-container">
                      <h1><span className="highlight">Stocks</span> markets </h1>
                    </div>
                  <div className="trading-view-forex-wrapper">
                      <div className="trading-view-card">
                          <div className="trading-view-card-text-container" >
                              <h1>stocks Market</h1>
                              <p>This widget displays crypto assets and then sorts them by their market capitalization.</p>
                          </div>
                          <Stocksoverview />
                      </div>
                      <div className="trading-view-card">
                          <div className="trading-view-card-text-container" >
                              <h1>stocks market Screener</h1>
                              <p>Separate the wheat from the chaff with this embeddable Screener – handy for sorting symbols both by fundamental and technical indicators.</p>
                          </div>
                          <Stockscreener />
                      </div>
                  </div>
            </section>
      </div>
      <Contact />
      <Footer />
      </>
  )
}

export default Stocks