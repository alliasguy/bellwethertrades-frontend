import React from 'react'
import './page.css'
import Header from '../components/Header/Header'
import About from '../components/about/About'
import Footer from '../components/footer/Footer'
import Contact from '../components/contact/Contact'
import ForexAnalysisSection from '../components/ForexAnalysisSection/ForexAnalysisSection'
import Copytrade from '../components/copytrade/Copytrade'
import Why from '../components/why/Why'
import TradeInfo from '../components/TradeInfo/TradeInfo'
import { motion } from 'framer-motion'
const Aboutpage = () => {
  return (
    <>
      <main className='about-page-land'>
        <Header />
        <section className='about-landpage my-about'>
          <div className="about-page-text">
            {/* <motion.div className="landpage-header">
              <motion.span className="landpage-line"></motion.span>
              <motion.div className="site-name"><span className="highlight"> ABOUT BELLWETHERTRADES</span></motion.div>
              <motion.span className="landpage-line"></motion.span>
          </motion.div> */}
          </div>
        </section>
        <Copytrade />
        <TradeInfo />
        <Why />
        <About />
        <ForexAnalysisSection />
        <Contact />
      </main>
      <Footer /></>
  )
}

export default Aboutpage