import React from 'react'
import './mt5section.css'
import { useNavigate } from 'react-router-dom'
import { BsArrowRight } from "react-icons/bs";

const Mt5Section = () => {
  const navigate = useNavigate()
  return (
    <section className='mt5-section'>
      <div className="mt5-container">
        <div className="mt5-content-wrapper">
          <div className="mt5-content" data-aos="fade-right">
            <span className="platform-tag">Advanced Technology</span>
            <h1>
              Global Markets at <br />
              <span className="gradient-text">Your Fingertips</span>
            </h1>
            <p>
              Execute trades on the award-winning MT5 platform with institutional-grade liquidity.
              Whether you self-trade or mirror-trade, experience sub-millisecond execution and zero interruptions.
            </p>
            <div className="feature-list">
              <div className="feature-item">
                <div className="feature-dot"></div>
                <span>Institutional-grade liquidity</span>
              </div>
              <div className="feature-item">
                <div className="feature-dot"></div>
                <span>Sub-millisecond latency</span>
              </div>
              <div className="feature-item">
                <div className="feature-dot"></div>
                <span>Advanced risk management tools</span>
              </div>
            </div>
            <button className="primary-btn" onClick={() => navigate('/signup')}>
              Start Trading Now <BsArrowRight />
            </button>
          </div>

          <div className="mt5-visuals" data-aos="fade-left">
            <div className="visual-backdrop"></div>
            <img src="/apexmockup19.png" className='platform-mockup' alt="Trading Platform" />

            {/* Floating Elements for depth */}
            <div className="floating-badge badge-1">
              <span>Zero Commissions</span>
            </div>
            <div className="floating-badge badge-2">
              <span>1:500 Leverage</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Mt5Section