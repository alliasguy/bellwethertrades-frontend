import React from 'react'
import './indices.css'
import Nasdaqwidget from '../../components/Nasdaqwidget'
import Header from '../../components/Header/Header'
import Contact from '../../components/contact/Contact'
import Footer from '../../components/footer/Footer'
import Indicesheatmap from '../../components/Futurewidget'
import { useNavigate } from 'react-router-dom'
import Us100widget from '../../components/Us100widget'
import Indicesscreener from '../../components/Indicesscreener'
const Indices = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className='forex-page-section'>
        <Header />
      <div className="forex-page-wrapper">
        <div className="videoframe-text-container" data-aos="fade-up">
          <h1><span className="highlight">Indices </span></h1>
        </div>
        <div className="forex-hero-section">
          <video src="/widgets-main-video.hvc1.3010a527240f8051d301.mp4" className="forex-page-video" autoPlay='true' loop='true'></video>
          <div className="floating-widget-right">
              <Us100widget />
          </div>
          <div className="floating-widget-left">
              <Nasdaqwidget />
          </div>
          </div>
          
        </div>
        <section className='trading-view-forex-section' data-aos="fade-up">
                    <div className="videoframe-text-container">
                      <h1>crypto <span className="highlight">Indices</span> markets </h1>
                    </div>
                  <div className="trading-view-forex-wrapper">
                      <div className="trading-view-card">
                          <div className="trading-view-card-text-container" >
                              <h1>indices Market</h1>
                              <p>This widget displays crypto assets and then sorts them by their market capitalization.</p>
                          </div>
                          <Indicesheatmap />
                      </div>
                      <div className="trading-view-card">
                          <div className="trading-view-card-text-container" >
                              <h1>indices Screener</h1>
                              <p>Separate the wheat from the chaff with this embeddable Screener – handy for sorting symbols both by fundamental and technical indicators.</p>
                          </div>
                          <Indicesscreener />
                      </div>
                  </div>
            </section>
      </div>
      <Contact />
      <Footer />
      </>
  )
}

export default Indices