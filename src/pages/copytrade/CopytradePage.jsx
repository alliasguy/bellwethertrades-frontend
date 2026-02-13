import React from 'react'
import './copytrade.css'
import Header from '../../components/Header/Header'
import Footer from '../../components/footer/Footer'
import ForexAnalysisSection from '../../components/ForexAnalysisSection/ForexAnalysisSection'
import Contact from '../../components/contact/Contact'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const CopytradePage = () => {
  const navigate = useNavigate()
  const [withdrawMethods, setWithdrawalMethods] = useState([
    {
      id: 1,
      min: '500',
      max: '4,999',
      type: 'starter plan',
      percent: '20',
      duration: '2 day(s)'
    },
    {
      id: 2,
      min: '5,000',
      max: '19,999',
      type: 'medium plan',
      percent: '35',
      duration: '4 day(s)'
    },
    {
      id: 3,
      min: '20,000',
      max: '49,999',
      type: 'classic plan',
      percent: '50',
      duration: '7 day(s)'
    },
    {
      id: 4,
      min: '50,000',
      max: '99,000',
      type: 'diamond plan',
      percent: '65',
      duration: '10 day(s)'
    },

  ])
  return (
    <>
      <section className='copytrade-page-section'>
        <Header />
        <div className="copytrade-gap"></div>
        <div className='ct-section copy-trade-plan-section'>
          <div className="videoframe-text-container" data-aos="fade-up">
            <h1> <span className="highlight">copytrade </span> plans</h1>
            <p>Here are some carefully currated investment plans, created to ensure maximum return of investment.</p>
          </div>
          <div className="service-gap"></div>
          <div className="ct-grid">
            {withdrawMethods.map((withdrawmethod) => (
              <div className="ct-card" key={withdrawmethod.id} >
                <div className="ct-card-header">
                  <h3>{withdrawmethod.type}</h3>
                  <h2>$ {withdrawmethod.min}</h2>
                </div>
                <div className="ct-features">
                  <div className="ct-feature-item">
                    <span className="ct-dot"></span>
                    <p>Minimum: $ {withdrawmethod.min}</p>
                  </div>
                  <div className="ct-feature-item">
                    <span className="ct-dot"></span>
                    <p>Maximum: $ {withdrawmethod.max}</p>
                  </div>
                  <div className="ct-feature-item">
                    <span className="ct-dot"></span>
                    <p>Return: {withdrawmethod.percent}%</p>
                  </div>
                  <div className="ct-feature-item">
                    <span className="ct-dot"></span>
                    <p>Duration: {withdrawmethod.duration}</p>
                  </div>
                  <div className="ct-feature-item">
                    <span className="ct-dot"></span>
                    <p>Min order: 0.1 lot</p>
                  </div>
                  <div className="ct-feature-item">
                    <span className="ct-dot"></span>
                    <p>Max order: 20 lots</p>
                  </div>
                  <div className="ct-feature-item">
                    <span className="ct-dot"></span>
                    <p>Leverage: 1:80</p>
                  </div>
                </div>
                <button className='ct-action-btn'>
                  Subscribe
                </button>
              </div>
            ))}
          </div>
        </div>
        <ForexAnalysisSection />
      </section>
      <Contact />
      <Footer />
    </>
  )
}

export default CopytradePage