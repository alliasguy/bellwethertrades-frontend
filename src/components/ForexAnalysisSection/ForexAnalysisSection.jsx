import React from 'react'
import './forexanalysis.css'
import TradingViewFinancials from '../TradingViewFinancials'
import TradingViewTechnicalAnalysis from '../TradingViewTechnicalAnalysis'
const ForexAnalysisSection = () => {
  return (
      <section className='trading-view-forex-section'>
            <div className="videoframe-text-container" data-aos="fade-up">
              <h1>market <span className="highlight">analysis </span></h1>
            </div>
          <div className="trading-view-forex-wrapper">
              <div className="trading-view-card">
                  <div className="trading-view-card-text-container" data-aos="fade-up">
                      <h1>Technical Analysis</h1>
                      <p>See what the technical analysis says about a given symbol with our display ratings, made for easy viewing.</p>
                  </div>
                  <TradingViewFinancials />
              </div>
              <div className="trading-view-card">
                  <div className="trading-view-card-text-container" data-aos="fade-up">
                      <h1>Fundamental Data</h1>
                      <p>Kick the tires on the fundamentals with this deep dive into how a company is doing beyond simply its stock price.</p>
                  </div>
                  <TradingViewTechnicalAnalysis />
              </div>
          </div>
    </section>
  )
}

export default ForexAnalysisSection