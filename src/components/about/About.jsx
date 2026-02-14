import React from 'react'
import './about.css'
import { useNavigate } from 'react-router-dom'
import TradingViewWidget from '../TradingViewWidget'

import { IoWallet } from "react-icons/io5";
import { BsBarChartFill } from "react-icons/bs";

const About = () => {
    const navigate = useNavigate()
  return (
      <div className='about-section' id='about'>
          <div className="videoframe-text-container" data-aos="fade-up">
          <div className="site-name"><span className="highlight">assets</span></div>
          <span className="landpage-line"></span>
        </div>
        <div className='why-choose-section'>
      <div className="why-choose-us-img-container">
        <div className="videoframe-text-container" data-aos="fade-up">
                <h1>Market  <span className="highlight">overview</span></h1>
                <p>Grab an overview of global markets including price changes, open, high, low, and close values for selected instruments.</p>
        </div>
        <img src="/bellmockup9.png" alt="" className="mockup" data-aos="fade-up"/>
        </div>
      <div className="why-choose-us-card-container">
        <div className="why-choose-us-text-container">
            <div className="header" data-aos="fade-up">
                <span className="header-line"></span>
                <h2>why choose us</h2>
            </div>
            <h1 data-aos="fade-up">best qualities</h1>
            <p data-aos="fade-up">Our Team combines a passion for arbitrage,stock,indices,forex and crypto trading, to ensure maximum profit.</p>
        </div>
            <div className="why-choose-us-card" data-aos="fade-up">
                            <span className="card-counter">01</span>
                            <IoWallet />
                            <h2>Make a deposit</h2>
                            <p>your trade plans are very much upgradeable at any point you want to. we provide our clients the ability to scale up their investments.</p>
                        </div>
                        <div className="why-choose-us-card" data-aos="fade-up">
                            <span className="card-counter">02</span>
                            <BsBarChartFill />
                            <h2>Start trading</h2>
                            <p>We use our advanced experience in arbitrage trading to minimize our clients cost of trade and unnecessary transaction expenses.</p>
                        </div>
        </div>
        </div>
    </div>
  )
}

export default About