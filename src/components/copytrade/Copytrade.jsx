import React from 'react'
import './copytrade.css'

const Copytrade = () => {

  return (
    <section className='copy-trade-section' id='copytrade'>
      <div className='copy-trade-wrapper'>
        <div className="copy-trade-content" data-aos="fade-right">
          <div className="section-header-left">
            <span className="subtitle-pill">Smart Investing</span>
            <h2>Automated <br /><span className="highlight-text">Wealth Creation</span></h2>
            <p>
              Why trade alone when you can partner with the best? AtlasMarkets allows you to automatically mirror the positions of verified top-performing traders.
            </p>
          </div>

          <div className="copy-features-grid">
            <div className="copy-feature-card">
              <h3>Verified Masters</h3>
              <p>Choose from a leaderboard of audited, profitable traders.</p>
            </div>
            <div className="copy-feature-card">
              <h3>Real-Time Sync</h3>
              <p>Trades are replicated in your account with sub-millisecond latency.</p>
            </div>
            <div className="copy-feature-card">
              <h3>Full Control</h3>
              <p>Stop, pause, or adjust your copy settings at any time.</p>
            </div>
          </div>
        </div>

        <div className="copy-trade-image-wrapper" data-aos="fade-up">
          <div className="visual-glow"></div>
          <img src="/bellmockup1.png" alt="AtlasMarkets Copy Trading" className="copy-mockup" />
          <div className="float-stat-card">
            <span className="stat-label">Avg. Return</span>
            <span className="stat-value">+12.5%</span>
            <span className="stat-sub">Monthly</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Copytrade