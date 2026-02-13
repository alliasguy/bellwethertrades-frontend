import React from 'react'
import './plan.css'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
const Plan = () => {
    const navigate = useNavigate()
    const [withdrawMethods,setWithdrawalMethods] = useState([
      {
        id:1,
        min:'1000',
        max:'4,999',      
        type:'starter plan',
        minimumOrder:'0.1',
        maximumOrder: '10',
        leverage:'1:20'
      },
      {
        id:2,
        min:'5,000',
        max:'19,999',
        type:'medium plan',
        minimumOrder:'0.1',
        maximumOrder: '15',
        leverage:'1:50'
      },
      {
        id:3,
        min:'20,000',
        max:'49,999',
        type:'classic plan',
        minimumOrder:'0.1',
        maximumOrder: '20',
        leverage:'1:80'
      },
      {
        id:4,
        min:'50,000',
        max:'99,000',
        type:'diamond plan',
        minimumOrder:'0.1',
        maximumOrder: '25',
        leverage:'1:100'
      },
      
      ])
  return (
    <div className='plan-section'>
      <div className="videoframe-text-container" data-aos="fade-up">
              <h1><span className="highlight">copytrade </span> plans</h1>
              <p>Here are some carefully currated copytrading plans, created to ensure maximum return of investment.</p>
      </div>
      <div className="service-gap"></div>
              <div className="plan-card-container">
              {
            withdrawMethods.map((withdrawmethod) => (
              <div class="pack-container" key={withdrawmethod.id} data-aos="fade-up">
            <div class="pack-header">
                  <h3>{withdrawmethod.type}</h3>
                  <h2>$ {withdrawmethod.min}</h2>
                  <button className='plan-card-btn' onClick={()=>navigate('/signup')}>
                    <p>Subscribe</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </button>

            </div>
                <div className='lot-wrapper'>
                  <div className="lot-container">
                      <span className="lot-line"></span><p>Minimum order: {withdrawmethod.minimumOrder} lots</p>
                  </div>
                  <div className="lot-container">
                      <span className="lot-line"></span><p>Maximum order: {withdrawmethod.maximumOrder} lots</p>
                  </div>
                  <div className="lot-container">
                      <span className="lot-line"></span><p>Leverage up to {withdrawmethod.leverage}</p>
                  </div>
            </div>
          </div>
          ))}
          </div>
        </div>
      )
    }

export default Plan