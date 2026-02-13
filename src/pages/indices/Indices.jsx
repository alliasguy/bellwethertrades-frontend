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
          <div className='about-section copy-trade-section'>
            <div className="about-wrapper copy-trade-wrapper about-copy-trade-section forex-copy-trade-section">
              <div className="about-page-img forex-img-container">
                <img src="/apexmockup10.png" className='forex-img ' data-aos="fade-up"/>
              </div>
              <div className="tesla-widget-text-container" data-aos="fade-up">
                  <h1>Indices <span className="highlight">trading</span> </h1>
                  <p>Buy and sell one currency for another on the market with the highest capitalization. There are a lot of big players in crypto including central banks, companies, etc. There is also room for strategies, you can get a few pips instantly on minor price fluctuations, or you can choose a safer method.</p>
                  <div className="tesla-widget-btn-container">
                      <button className='launch-btn'
                    initial={{y:45, opacity:0}}
                    animate={{y:0, opacity:1}}
                    transition={{duration:0.65,delay:0.6}}
                    onClick={()=>{
                        navigate('/signup')
                    }}
                >
                    <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M5 13c0-5.088 2.903-9.436 7-11.182C16.097 3.564 19 7.912 19 13c0 .823-.076 1.626-.22 2.403l1.94 1.832a.5.5 0 0 1 .095.603l-2.495 4.575a.5.5 0 0 1-.793.114l-2.234-2.234a1 1 0 0 0-.707-.293H9.414a1 1 0 0 0-.707.293l-2.234 2.234a.5.5 0 0 1-.793-.114l-2.495-4.575a.5.5 0 0 1 .095-.603l1.94-1.832C5.077 14.626 5 13.823 5 13zm1.476 6.696l.817-.817A3 3 0 0 1 9.414 18h5.172a3 3 0 0 1 2.121.879l.817.817.982-1.8-1.1-1.04a2 2 0 0 1-.593-1.82c.124-.664.187-1.345.187-2.036 0-3.87-1.995-7.3-5-8.96C8.995 5.7 7 9.13 7 13c0 .691.063 1.372.187 2.037a2 2 0 0 1-.593 1.82l-1.1 1.039.982 1.8zM12 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" fill="currentColor"></path></svg>
                    <span>start trading</span>
                </button>
                  </div>
              </div>
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