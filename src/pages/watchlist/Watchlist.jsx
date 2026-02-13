import React from 'react'
import './watchlist.css'
import Header from '../../components/Header/Header'
import Contact from '../../components/contact/Contact'
import Footer from '../../components/footer/Footer'
import { useNavigate } from 'react-router-dom'
import Cryptowatchlist from '../../components/Cryptowatchlist'
import TradingViewWidget from '../../components/TradingViewWidget'
import MiniSymbolOverviewWidget from '../../components/MiniSymbolOverviewWidget'
const Watchlist = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className='forex-page-section'>
        <Header />
      <div className="forex-page-wrapper">
        <div className="videoframe-text-container" data-aos="fade-up">
          <h1> <span className="highlight">Watchlist </span></h1>
        </div>
        <div className="forex-hero-section news-widget-container">
          <MiniSymbolOverviewWidget />
          </div>
           <section className='trading-view-forex-section' data-aos="fade-up">
                    <div className="videoframe-text-container">
                      <h1><span className="highlight">market</span> watchlist </h1>
                    </div>
                  <div className="trading-view-forex-wrapper">
                      <div className="trading-view-card">
                          <div className="trading-view-card-text-container">
                              <h1>crypto watchlist</h1>
                              <p>This one allows you to display real-time quotes of selected currencies in comparison to other major currencies.</p>
                          </div>
                          <TradingViewWidget />
                      </div>
                      <div className="trading-view-card">
                          <div className="trading-view-card-text-container">
                              <h1>Forex watchlist</h1>
                              <p>Showcase a snapshot of currency market action. This widget lets you spot strong and weak currencies and see how they compare to each other, all in real-time.</p>
                          </div>
                          <Cryptowatchlist />
                      </div>
                  </div>
            </section>
          </div>
      </div>
      <Contact />
      <Footer />
      </>
  )
}

export default Watchlist