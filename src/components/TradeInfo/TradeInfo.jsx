import React from 'react'
import './tradeInfo.css'
import { IoCalendarNumberOutline } from "react-icons/io5";
import { TbClockStar } from "react-icons/tb";
import { GrDocumentPerformance } from "react-icons/gr";
const TradeInfo = () => {
  return (
    <section className='tradeInfo-section'>
      <div className="tradeInfo-wrapper">
        <div class="forex-card" data-aos="fade-up">
          <div class="img">
            <GrDocumentPerformance /> 
          </div>
          <div class="textBox">
            <div class="textContent">
              <p class="h1">Short-Term Contracts</p>
            </div>
            <p class="p">Trading intra-day, daily or weekly provides unique opportunities.</p>
          <div>
        </div></div></div>
        <div class="forex-card" data-aos="fade-up">
          <div class="img">
            <TbClockStar />
          </div>
          <div class="textBox">
            <div class="textContent">
              <p class="h1">Trading Around the Clock</p>
            </div>
            <p class="p">24 hours a day, Monday-Saturday only, using mt4 and mt5.</p>
          <div>
        </div></div></div>
        <div class="forex-card" data-aos="fade-up">
          <div class="img">
            <IoCalendarNumberOutline />
          </div>
          <div class="textBox">
            <div class="textContent">
              <p class="h1">Active Markets</p>
            </div>
            <p class="p">23 hours a day, Monday-Saturday using mt4 and mt5.</p>
          <div>
        </div></div></div>
      </div>
    </section>
  )
}

export default TradeInfo