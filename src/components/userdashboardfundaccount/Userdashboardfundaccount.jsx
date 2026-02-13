import React from 'react'
import {Link} from 'react-router-dom'
import {FiArrowRight} from 'react-icons/fi'
import { motion,AnimatePresence } from 'framer-motion'
import {MdClose} from 'react-icons/md'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import {AiOutlineArrowLeft} from 'react-icons/ai'
import Swal from 'sweetalert2'
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import './userdashboardfundaccount.css'
import Checkout from '../Checkout';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
const Userdashboardfundaccount = ({route}) => {
  const navigate = useNavigate()
  const [depositAmount, setDepositAmount] = useState()
  const [checkoutPage,setCheckoutPage] = useState(false)
  const [showModal,setShowModal] =useState(false)
  const [activeMethod, setActiveMethod] = useState()
  const depositOptions=[
    {
      id:1,
      min:1,
      max:1000,
      image:'/btc.png',
      method:'BTC',
      wallet:'bc1qw6dz4cmt2zyvd2astu5z8pqwe7n4e2lcp69ec7',
    },
    {
      id:2,
      min:1,
      max:1000,
      image:'/etherium.png',
      method:'ETH',
      wallet:'0xA74D9dF6de4209Ec4dcd125439a7Df81464900E8'
    },
    {
      id:3,
      min:1,
      max:1000,
      image:'/tron.png',
      method:'USDT (TRC20 tron) ',
      wallet:'TMypFJj3seJ2eiZiLxR5dgMjvGuyNZi6Tf'
    },
    {
      id:4,
      min:1,
      max:1000,
      image:'/usdc-coin.png',
      method:'USDC (Base Mainnet) ',
      wallet:'0xA74D9dF6de4209Ec4dcd125439a7Df81464900E8'
    },
    {
      id:5,
      min:1,
      max:1000,
      image:'/solana.png',
      method:'Solana (SOL) ',
      wallet:'HKQoc7JEyN4L1hkBzeMZBHqVd6eTnp2E7aEf7axhtH14'
    },
    {
      id:6,
      min:1,
      max:1000,
      image:'/dogecoin-logo.png',
      method:'Dogecoin ',
      wallet:'DPwAEjeb2Auk7nHYC1YwSeGm43YpBECNR3'
    },
    {
      id:7,
      min:1,
      max:1000,
      image:'/xrp-icon.png',
      method:'XRP ',
      wallet:'rhb4Jq8GpNM1SWkj2CLfVGFez2TtoWKYJH'
    },
    {
      id:8,
      min:1,
      max:1000,
      image:'/bnb.png',
      method:'BNB ',
      wallet:'0xA74D9dF6de4209Ec4dcd125439a7Df81464900E8'
    },
  ]

  // sweel alert code 
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  const close = ()=>{
    setCheckoutPage(false)
  }
  const [selectedCrypto, setSelectedCrypto] = useState(null);

  const handleChange = (e) => {
    const selectedMethod = e.target.value;
    const methodDetails = depositOptions.find(opt => opt.method === selectedMethod);
    setSelectedCrypto(methodDetails);
  };
  
  return (
    <>
    {!checkoutPage &&
      <main className="homewrapper">
      {
            showModal &&
          <AnimatePresence 
            initial={{y:45, opacity:0}}
            animate={{y:0, opacity:1}}
            transition={{duration:0.65,delay:0.4}}
          >
          <motion.div 
            
          >
            <div className="modal-container">
              <div className="modal">
                <div className="modal-header">
                  <h2>deposit via {activeMethod.method}</h2>
                  <p>minimum deposit: {activeMethod.min} USD</p>
                </div>
              <MdClose className='close-modal-btn' onClick={()=>{setShowModal(false)}}/>
                <div className="modal-input-container">
                  <div className="modal-input">
                    <input type="tel" placeholder='0.00' onChange={(e)=>{
                      setDepositAmount(parseInt(e.target.value))
                    }}/>
                    <span>USD</span>
                  </div>
                </div>
                <div className="modal-btn-container">
                  <button class="noselect" onClick={()=>{setShowModal(false)}}>
                    <span class="text">close</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg"       width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span>
                  </button>
                  <button className='next' onClick={()=>{
                    if(depositAmount >= activeMethod.min){
                      setCheckoutPage(true)
                    }
                    else if(isNaN(depositAmount)){
                      Toast.fire({
                        icon: 'warning',
                        title: 'only numbers are accepted'
                      })
                    }
                    else{
                      Toast.fire({
                        icon: 'warning',
                        title: 'Deposit Amount too low'
                      })
                    }
                  }}>
                    <span class="label">Next</span>
                    <span class="icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path></svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
            </motion.div>
          </AnimatePresence >
          }
        
          <section className="page-swiper-wrapper">
            <div className="floating-btn" onClick={()=>{
                    navigate('/dashboard')
                  }}>
                <AiOutlineArrowLeft />
              </div>
            <div className="page-header">
                <h3>Choose an Option</h3>
                <h2>Deposit Methods</h2>
                <p>Choose a deposit method to add money.</p>
            </div>
            <div className="swiper-container">
                <div className='updated-crypto-container'>
                  <h2>Select Cryptocurrency</h2>
                  <select onChange={handleChange} defaultValue="" className='crypto-select'>
                    <option value="" disabled>Select method</option>
                    {depositOptions.map(opt => (
                      <option key={opt.id} value={opt.method}>
                        {opt.method}
                      </option>
                    ))}
                  </select>

                  {selectedCrypto && (
                  <div className='updated-crypto-card'>
                    <div className="updated-img-cont">
                      <img src={selectedCrypto.image} alt={selectedCrypto.method} className='updated-crypto-img' />
                    </div>
                    <p><strong>Method:</strong> {selectedCrypto.method}</p>
                    {/* <p><strong>Minimum deposit:</strong> ${selectedCrypto.min}</p> */}
                    <button className="deposit-btn updated-btn" onClick={()=>{
                        setActiveMethod({
                          id:`${selectedCrypto.id}`,
                          min:`${selectedCrypto.min}`,
                          max:`${selectedCrypto.max}`,
                          image:`${selectedCrypto.image}`,
                          method:`${selectedCrypto.method}`,
                          wallet:`${selectedCrypto.wallet}`
                        })
                        setShowModal(true)
                      }}>proceed</button>
                    </div>
                  )}
                </div>
            </div>
            {/* <div className="swiper-container mobile-swiper-container">
                <Swiper
                  spaceBetween={30}
                  navigation={true}
                  modules={[Pagination, Navigation]}
                  className="mySwiper"
                >
                  {
                      withdrawMethods.map((withdrawmethod) => (
                      <SwiperSlide key={withdrawmethod.id} className='my-slide'>
                      <div className="crypto-card-img-container">
                        <img src={withdrawmethod.image} alt="" />
                        <h2>{withdrawmethod.method}</h2>
                      </div>
                      <div className="investrange-container">
                        <div className="investrange-card">
                          <p>minimum:</p>
                          <p>{withdrawmethod.min} USD</p>
                        </div>
                        <div className="investrange-card">
                          <p>charge</p>
                          <p>0 USD + 0%</p>
                        </div>
                      </div>
                      <button className="deposit-btn" onClick={()=>{
                        setActiveMethod({
                          id:`${withdrawmethod.id}`,
                          min:`${withdrawmethod.min}`,
                          max:`${withdrawmethod.max}`,
                          image:`${withdrawmethod.image}`,
                          method:`${withdrawmethod.method}`,
                          wallet:`${withdrawmethod.wallet}`
                        })
                        setShowModal(true)
                      }}>deposit</button>
                    </SwiperSlide>
                    ))}
                </Swiper>
            </div> */}
            
            <button className="history-btn" onClick={()=>{
              navigate('/deposit')
            }}>
              deposit history
              <FiArrowRight />
            </button>
        </section> 
    </main>}
    {
        checkoutPage &&
        <Checkout Active={activeMethod} depositAmount={depositAmount} closepage={close} route={route}/>
    }
    </> 
  )
}

export default Userdashboardfundaccount