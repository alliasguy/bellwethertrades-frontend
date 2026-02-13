import React, { useRef, useState } from 'react'
import './review.css'
// Import Swiper React components
import { ImQuotesLeft } from 'react-icons/im'
import { ImQuotesRight } from 'react-icons/im'
import { AiTwotoneStar } from 'react-icons/ai'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules


const Review = () => {

  return (
    <>
      <div className='review-section'>
        <div className="videoframe-text-container">
          <h1>investors <span className="highlight">review </span></h1>
          <p>here are some reviews left by our most profitable investors.</p>
        </div>
        <div className="review-card-container">
          <div className="review-card" data-aos="fade-up">
            <div className="review-card-img-container">
              <img src="/blackInvestor.jpeg" alt="" />
              <div className="review-card-rating-container">
                <div className="rate-icon-container">
                  <AiTwotoneStar />
                  <AiTwotoneStar />
                  <AiTwotoneStar />
                  <AiTwotoneStar />
                  <AiTwotoneStar />
                </div>
                <p className='investor-name'>james Donald.</p>
              </div>
            </div>
            <div className="investor-review-container">
              <span className='right-quote'>
                <ImQuotesLeft />
              </span>
              <p>I’ve been using BellwetherTrades for over a year, and the results have been outstanding. The platform connects me with highly skilled traders whose strategies I can copy automatically. It's taken the guesswork out of trading and allowed my portfolio to grow steadily. The transparency and performance tracking tools give me full confidence in the process. BellwetherTrades truly stands out.</p>

              <span className="left-quote">
                <ImQuotesRight />
              </span>
            </div>
          </div>
          <div className="review-card" data-aos="fade-up">
            <div className="review-card-img-container">
              <img src="/photo-1624797432677-6f803a98acb3.jpg" alt="" />
              <div className="review-card-rating-container">
                <div className="rate-icon-container">
                  <AiTwotoneStar />
                  <AiTwotoneStar />
                  <AiTwotoneStar />
                  <AiTwotoneStar />
                  <AiTwotoneStar />
                </div>
                <p className='investor-name'>Michael M.</p>
              </div>
            </div>
            <div className="investor-review-container">
              <span className='right-quote'>
                <ImQuotesLeft />
              </span>
              <p>BellwetherTrades has completely changed the way I approach the markets. I was looking to get into trading but didn’t know where to start. Their expert-led copytrading system allowed me to benefit from the experience of seasoned traders without needing to trade myself. I’ve seen consistent gains and feel in control of my financial journey, even with zero prior trading experience.</p>

              <span className="left-quote">
                <ImQuotesRight />
              </span>
            </div>
          </div>
          <div className="review-card" data-aos="fade-up">
            <div className="review-card-img-container">
              <img src="/gregory-gill-4Bf5LNEPqZ0-unsplash.jpg" alt="" />
              <div className="review-card-rating-container">
                <div className="rate-icon-container">
                  <AiTwotoneStar />
                  <AiTwotoneStar />
                  <AiTwotoneStar />
                  <AiTwotoneStar />
                  <AiTwotoneStar />
                </div>
                <p className='investor-name'>Michael H.</p>
              </div>
            </div>
            <div className="investor-review-container">
              <span className='right-quote'>
                <ImQuotesLeft />
              </span>
              <p>Choosing BellwetherTrades has been one of the best financial decisions I’ve made. The platform’s focus on real-time trade mirroring, combined with a simple interface and clear analytics, makes it easy to follow what’s happening in my account. I appreciate the professionalism of the traders I copy and the overall reliability of the system. Highly recommended for anyone who wants to grow their money passively through the markets.</p>

              <span className="left-quote">
                <ImQuotesRight />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Review