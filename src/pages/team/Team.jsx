import React, {useRef,useState} from 'react'
// Import Swiper React components
import {ImQuotesLeft} from 'react-icons/im'
import {ImQuotesRight} from 'react-icons/im'
import {AiTwotoneStar} from 'react-icons/ai'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './team.css'
import Contact from '../../components/contact/Contact';
import Footer from '../../components/footer/Footer';
import Header from '../../components/Header/Header';
const Terms = () => {
  return (
    <>
      <div className='review-section'>
        <Header />
            <div className="videoframe-text-container team-header">
              <h1>meet our <span className="highlight">team </span></h1>
              <p>here's our team</p>
            </div>
            <div className="review-card-container team-card-container">
              <div className="review-card team-card" data-aos="fade-up">
                <div className="review-card-img-container">
                  <img src="/gregory-gill-4Bf5LNEPqZ0-unsplash.jpg" alt="" />
                  <div className="review-card-rating-container">
                    <div className="rate-icon-container">
                      <small>founder</small>
                    </div>
                    <p className='investor-name'>james Donald .c.</p>
                  </div>
                </div>
              </div>
              <div className="review-card team-card" data-aos="fade-up">
                <div className="review-card-img-container">
                  <img src="/black3.jpg" alt="" />
                  <div className="review-card-rating-container">
                    <div className="rate-icon-container">
                      <small>director</small>
                    </div>
                    <p className='investor-name'>pete owens</p>
                  </div>
                </div>
              </div>
              <div className="review-card team-card" data-aos="fade-up">
                <div className="review-card-img-container">
                  <img src="/blackInvestor.jpeg" alt="" />
                  <div className="review-card-rating-container">
                    <div className="rate-icon-container">
                      <small>manager</small>
                    </div>
                    <p className='investor-name'>john peterson</p>
                  </div>
                </div>
              </div>
              <div className="review-card team-card" data-aos="fade-up">
                <div className="review-card-img-container">
                  <img src="/coporate-woman.jpg" alt="" />
                  <div className="review-card-rating-container">
                    <div className="rate-icon-container">
                      <small>custormer care</small>
                    </div>
                    <p className='investor-name'>catherine kate</p>
                  </div>
                </div>
              </div>
              <div className="review-card team-card" data-aos="fade-up">
                <div className="review-card-img-container">
                  <img src="/istockphoto-1133598770-170667a.jpg" alt="" />
                  <div className="review-card-rating-container">
                    <div className="rate-icon-container">
                      <small>portfolio manager</small>
                    </div>
                    <p className='investor-name'>bob kinley</p>
                  </div>
                </div>
              </div>
              <div className="review-card team-card" data-aos="fade-up">
                <div className="review-card-img-container">
                  <img src="/cop-woman.jpg" alt="" />
                  <div className="review-card-rating-container">
                    <div className="rate-icon-container">
                      <small>receptionist</small>
                    </div>
                    <p className='investor-name'>layla hall</p>
                  </div>
                </div>
              </div>
            </div>
      </div>
      <Contact />
      <Footer />
        </>
  )
}

export default Terms