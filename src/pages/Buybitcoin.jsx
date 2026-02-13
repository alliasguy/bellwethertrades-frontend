import React from 'react'
import Header from '../components/Header/Header'
import About from '../components/about/About'
import Footer from '../components/footer/Footer'
import Contact from '../components/contact/Contact'

const Buybitcoin = () => {
  return (
    <>
    <main className='buy-crypto-landpage'>
    <Header />
      <section className='about-landpage bitcoin-lanpage'>
        <div className="about-page-text">
          <h3>want to buy bitcoin?</h3>
          <span className="small-thin-line"></span>
        </div>
      </section>
      <section className='bitcoin-card-container'>
        <div className="why-choose-us-text-container buy-bitcoin-text">
            <div className="header" data-aos="fade-up">
                <span className="header-line"></span>
                <h2>where to buy</h2>
            </div>
            <h1 data-aos="fade-up">best cryptocurrencies</h1>
            <p data-aos="fade-up">Below is a list of the best crypto currency companies that has been tested and trusted, where you can securely buy Bitcoin and other crypto currencies.</p>
        </div>
        <div className="bitcoin-card flipped" data-aos="fade-up">
          <div className="bitcoin-card-text-container">
            <h2>paxful</h2>
            <p>Trade Bitcoin with Paxful.
                Join the leading peer-to-peer platform to buy and sell Bitcoin using 350+ payment methods with 10 million people just like you.
              </p>
            <a href="https://paxful.com/roots/buy-bitcoin" target='blank'>
            <button class="learn-more">
              <span class="circle" aria-hidden="true">
              <span class="icon arrow"></span>
              </span>
              <span class="button-text">Buy Now</span>
            </button>
            </a>
          </div>
          <img src="/Paxful-Review-1.jpg" alt="" className='bitcoin-img'/>
        </div>
        <div className="bitcoin-card" data-aos="fade-up">
          <div className="bitcoin-card-text-container">
            <h2>coinmama</h2>
            <p>Buy & sell crypto instantly
              Join the world’s friendliest, most reliable, secure and one of the most patronized crypto exchange platform in the world.</p>
            <a href="https://coinmama.com" target='blank'>
            <button class="learn-more">
              <span class="circle" aria-hidden="true">
              <span class="icon arrow"></span>
              </span>
              <span class="button-text">Buy Now</span>
            </button>
            </a>
          </div>
          <img src="/usK6OYGk-36f80bdc-4a73-4e9d-bda7-298564731a26.webp" alt="" className='bitcoin-img'/>
        </div>
        <div className="bitcoin-card flipped" data-aos="fade-up">
        <div className="bitcoin-card-text-container">
            <h2>bit2me</h2>
            <p>Take back control of your money. The future is crypto.
              Buy cryptocurrencies with maximum security and in the easiest way</p>
            <a href="https://bit2me.com/en/" target="_blank" rel="noopener noreferrer">
            <button class="learn-more">
              <span class="circle" aria-hidden="true">
              <span class="icon arrow"></span>
              </span>
              <span class="button-text">Buy Now</span>
            </button>
            </a>
          </div>
          <img src="/maxresdefault.jpg" alt="" className='bitcoin-img'/>
        </div>
        <div className="bitcoin-card" data-aos="fade-up">
        <div className="bitcoin-card-text-container">
            <h2>coinmate</h2>
            <p>Cryptocurrencies can change our world more than the internet. We're still at the very beginning, like the internet in the '90s. Who wouldn't want to buy stocks like Google, Amazon or Apple for a fraction of today's prices? We offer an easy and secure way to get a share of this unique investment opportunity.</p>
            <a href="https://coinmate.io/home" target="_blank" rel="noopener noreferrer">
            <button class="learn-more">
              <span class="circle" aria-hidden="true">
              <span class="icon arrow"></span>
              </span>
              <span class="button-text">Buy Now</span>
            </button>
            </a>
          </div>
          <img src="/1667233395787-5a4cc89e-e0a1-475f-9e94-d3c4fc1c6791.jpg" alt="" className='bitcoin-img'/>
        </div>
        <div className="bitcoin-card flipped" data-aos="fade-up">
        <div className="bitcoin-card-text-container">
            <h2>binance</h2>
            <p>Buy, trade, and hold 350+ cryptocurrencies on Binance.Binance is one of the most noteable and reliable crypto trading platform. You can also buy and sell bitcoin there.</p>
            <a href="https://binance.com" target="_blank" rel="noopener noreferrer">
            <button class="learn-more">
              <span class="circle" aria-hidden="true">
              <span class="icon arrow"></span>
              </span>
              <span class="button-text">Buy Now</span>
            </button>
            </a>
          </div>
          <img src="/22aee16e43e33d890ee49cfcebbe3d94.jpg" alt="" className='bitcoin-img'/>
        </div>
      </section>
      <Contact />
      </main>
      <Footer />
      </>
  )
}

export default Buybitcoin