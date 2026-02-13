import React from 'react'
import './feature.css'
import {FaGlobeAmericas} from 'react-icons/fa'
import {BsBank} from 'react-icons/bs'
import {FaUsers} from 'react-icons/fa'
import { RiExchangeDollarLine } from 'react-icons/ri'
import { CgArrowsExchangeV } from 'react-icons/cg'
import CountUp from '../countup/Countup'
const Feature = () => {
  return (
    <section className='info-section'>
      <div className="why-choose-us-text-container review-head-container">
            <div className="header review-header" data-aos="fade-up">
                <span className="header-line"></span>
                <h2>our statistics across the world</h2>
            </div>
            <h1 data-aos="fade-up">our statistics today</h1>
        </div>
      <div className="info-wrapper">
        <div className="info-left-card-container">
          <div className="info-left-card" data-aos="fade-up">
            <FaGlobeAmericas />
            <CountUp end={175} />
            <p>supported countries</p>
          </div>
        </div>
        <div className="info-right-card-container">
          <div className="info-right-card" data-aos="fade-up">
            <RiExchangeDollarLine />
            <CountUp end={19087} />
            <p>satisfied users</p>
          </div>
          <div className="info-right-card" data-aos="fade-up">
            <BsBank />
            <CountUp end={10954} />
            <p>successful withdrawals</p>
          </div>
          <div className="info-right-card" data-aos="fade-up">
            <FaUsers />
            <CountUp end={13641} />
            <p>active investors</p>
          </div>
          <div className="info-right-card" data-aos="fade-up">
            <CgArrowsExchangeV />
            <CountUp end={15040} />
            <p>successful deposits</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Feature