import React from 'react'
import './info.css'
import {RiShieldUserLine} from 'react-icons/ri'
import {GiReceiveMoney} from 'react-icons/gi'
import {BsBarChartLine} from 'react-icons/bs'
import {FaRegHandshake} from 'react-icons/fa'
const Info = () => {
  return (
    <section className='info-section'>
      <div className="info-card">
          <RiShieldUserLine />
          <h2>30457+</h2>
          <span className="small-thin-line"></span>
          <h3>satisfied users</h3>
      </div>
      <div className="info-card">
          <BsBarChartLine />
          <h2>440457+</h2>
          <span className="small-thin-line"></span>
          <h3>successful investments</h3>
      </div>
      <div className="info-card">
          <GiReceiveMoney />
          <h2>675876+</h2>
          <span className="small-thin-line"></span>
          <h3>successful withdrawals</h3>
      </div>
      <div className="info-card">
          <FaRegHandshake />
          <h2>184+</h2>
          <span className="small-thin-line"></span>
          <h3>supported countries</h3>
      </div>
      <div className="info-overlay"></div>
    </section>
  )
}

export default Info