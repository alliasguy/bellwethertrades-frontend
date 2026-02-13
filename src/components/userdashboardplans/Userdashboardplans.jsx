import React , {useState} from 'react'
import Userdashboardheader from '../userdashboardheader/Userdashboardheader'
import {FiArrowRight} from 'react-icons/fi'
import Checkout from '../Checkout';
import {MdClose} from 'react-icons/md'
import { motion,AnimatePresence } from 'framer-motion'
import Swal from 'sweetalert2';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import {RxDash} from 'react-icons/rx'
import { useNavigate } from 'react-router-dom';
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import { Pagination, Navigation ,FreeMode} from "swiper";
import Loader from '../Loader';
const Userdashboardplans = ({route}) => {
  const [showModal,setShowModal] =useState(false)
  const [activeMethod, setActiveMethod] = useState()
  const [checkoutPage,setCheckoutPage] = useState(false)
  const [amount,setAmount] = useState()
  const [loader,setLoader] = useState(false)


  const navigate = useNavigate()

  const [withdrawMethods,setWithdrawalMethods] = useState([
    {
        id:1,
        min:500,
        max:4999,
        image:'/btc.png',
        method:'BTC',
        type:'starter plan',
        percent:'20%',
        duration:'2 days'
      },
      {
        id:2,
        min:5000,
        max:19999,
        image:'/bnb.png',
        method:'USDT',
        type:'gold plan',
        percent:'35%',
        duration:'4 days'
      },
      {
        id:3,
        min:20000,
        max:49999,
        image:'/tron.png',
        method:'tether(TRC20)',
        type:'premium plan',
        percent:'50%',
        duration:'7 days'
      },
      {
        id:4,
        min:50000,
        max:99000,
        image:'/tron.png',
        method:'tether(TRC20)',
        type:'diamond plan',
        percent:'65%',
        duration:'10 days'
      },
      {
        id:5,
        min:100000,
        max:199999,
        image:'/tron.png',
        method:'tether(TRC20)',
        type:'VIP plan',
        percent:'80%',
        duration:'12 days'
      },
      {
        id:6,
        min:200000,
        max:5000000,
        image:'/tron.png',
        method:'tether(TRC20)',
        type:'real estate plan',
        percent:'100%',
        duration:'14 days'
      },
  ])
  

   // sweet alert function 

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

  // invest call function 

  const invest =  async()=>{
      setLoader(true)
      const req = await fetch(`${route}/api/invest`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          'x-access-token': localStorage.getItem('token')
        },
        body: JSON.stringify({
          amount:amount,
          percent:activeMethod.percent,
          min:parseInt(activeMethod.min),
          max:parseInt(activeMethod.max),
          plan:activeMethod.plan,
          duration:activeMethod.duration
        })
      })
      const res = await req.json()
      setLoader(false)
      if(res.status === 'ok'){
        Toast.fire({
          icon: 'success',
          title: `Your investment of $${res.amount} USD was successful`
        })
        navigate('/investments')
      }
      else if(res.status === 400){
        Toast.fire({
          icon: 'error',
          title: ` ${res.message}`
        })
      }
      else if(res.status === 404){
        Toast.fire({
          icon: 'error',
          title: ` ${res.message}`
        })
      }
      else{
        Toast.fire({
          icon: 'error',
          title: ` ${res.error}`
        })
      }
  }

  return (
    <>
      <div className='homewrapper'>
      {
          loader && 
            <Loader />
        }
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
                  <h2>plan selected: {activeMethod.type}</h2>
                  <p>min: {activeMethod.min} - max: {activeMethod.max}</p>
                </div>
              <MdClose className='close-modal-btn' onClick={()=>{setShowModal(false)}}/>
                <div className="modal-input-container">
                  <div className="modal-input">
                    <input type="tel" placeholder='0.00' onChange={(e)=>{
                        setAmount(parseInt(e.target.value))
                    }}/>
                    <span>USD</span>
                  </div>
                </div>
                <div className="modal-btn-container">
                  <button class="noselect" onClick={()=>{
                    setShowModal(false)
                  }}>
                    <span class="text">close</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg"       width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span>
                  </button>
                  <button className='next' onClick={()=>{
                    if(amount < activeMethod.min){
                      Toast.fire({
                        icon: 'error',
                        title: `Amount lower is than Investment Range`
                      })
                    }
                    else if(amount > activeMethod.max){
                      Toast.fire({
                        icon: 'error',
                        title: `Amount Higher is than Investment Range`
                      })
                    }
                    else if(amount === undefined || isNaN(amount)){
                      Toast.fire({
                        icon: 'error',
                        title: `Amount must be a number`
                      })
                    }
                    else{
                      invest()
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
        <Userdashboardheader route={route}/>
        <div className="page-swiper-wrapper">
            <div className="page-header">
                <h3>Choose an Option</h3>
                <h2>investment plans</h2>
                <p>Choose an investment plan to start earning immediately</p>
            </div>
            <div className="swiper-container">
                <Swiper
                  slidesPerView={3}
                  spaceBetween={20}
                  slidesPerGroup={1}
                  loop={true}
                  loopFillGroupWithBlank={true}
                  navigation={true}
                  modules={[ Navigation]}
                  className="mySwiper"
                >
                  {
                    withdrawMethods.map((withdrawmethod) => (
                  <SwiperSlide key={withdrawmethod.id} className='my-slide'>
                  <div className="crypto-card-img-container dashboard-plan-card-header">
                    <h3>{withdrawmethod.type}</h3>
                    <div className="plan-card-headerdiv">
                      <span className="small-plan-head">
                        <h3>{withdrawmethod.percent}</h3>
                        <p>everyday</p>
                      </span>
                      <span className="small-plan-head">
                              <h3>{ withdrawmethod.duration}</h3>
                        <p>duration</p>
                      </span>
                    </div>
                  </div>
                  <div className="investrange-container investcard-cont">
                      <div className="investrange-card invest-card">
                        <p>minimum deposit</p>
                        <RxDash />
                        <p>$ {withdrawmethod.min} USD</p>
                      </div>
                      <div className="investrange-card invest-card">
                        <p>maximum deposit</p>
                        <RxDash />
                        <p>$ {withdrawmethod.max} USD</p>
                      </div>
                      <div className="investrange-card invest-card">
                        <p>capital return</p>
                        <RxDash />
                        <p>{withdrawmethod.percent}</p>
                      </div>
                      <div className="investrange-card invest-card">
                        <p>referral bonus</p>
                        <RxDash />
                        <p> 10%</p>
                      </div>
                      <div className="investrange-card invest-card">
                          <p>duration</p> 
                          <RxDash />
                          <p>{withdrawmethod.duration}</p>
                      </div>
                    </div>
                    <button className="deposit-btn" onClick={()=>{
                      setActiveMethod({
                        id:`${withdrawmethod.id}`,
                        min:`${withdrawmethod.min}`,
                        max:`${withdrawmethod.max}`,
                        image:`${withdrawmethod.image}`,
                        method:`${withdrawmethod.method}`,
                        type:`${withdrawmethod.type}`,
                        percent:`${withdrawmethod.percent}`,
                        plan:`${withdrawmethod.type}`,
                        duration:`${withdrawmethod.duration}`
                      })
                      setShowModal(true)
                    }}>choose plan</button>
                  </SwiperSlide>
                  ))}
                </Swiper>
            </div>
            <div className="swiper-container mobile-swiper-container">
                <Swiper
                  // pagination={{
                  //   type: "fraction",
                  // }}
                  navigation={true}
                  spaceBetween={30}
                  modules={[Pagination, Navigation]}
                  className="mySwiper"
                >
                  {
                    withdrawMethods.map((withdrawmethod) => (
                  <SwiperSlide key={withdrawmethod.id} className='my-slide'>
                  <div className="crypto-card-img-container dashboard-plan-card-header">
                    <h3>{withdrawmethod.type}</h3>
                    <div className="plan-card-headerdiv">
                      <span className="small-plan-head">
                        <h3>{withdrawmethod.percent}</h3>
                        <p>everyday</p>
                      </span>
                      <span className="small-plan-head">
                              <h3>{withdrawmethod.duration}</h3>
                        <p>duration</p>
                      </span>
                    </div>
                  </div>
                  <div className="investrange-container investcard-cont">
                      <div className="investrange-card invest-card">
                        <p>minimum deposit</p>
                        <RxDash />
                        <p>$ {withdrawmethod.min} USD</p>
                      </div>
                      <div className="investrange-card invest-card">
                        <p>maximum deposit</p>
                        <RxDash />
                        <p>$ {withdrawmethod.max} USD</p>
                      </div>
                      <div className="investrange-card invest-card">
                        <p>capital return</p>
                        <RxDash />
                        <p>{withdrawmethod.percent}</p>
                      </div>
                      <div className="investrange-card invest-card">
                        <p>total return</p>
                        <RxDash />
                        <p> {withdrawmethod.percent}</p>
                      </div>
                    </div>
                    <button className="deposit-btn" onClick={()=>{
                      setActiveMethod({
                        id:`${withdrawmethod.id}`,
                        min:`${withdrawmethod.min}`,
                        max:`${withdrawmethod.max}`,
                        image:`${withdrawmethod.image}`,
                        method:`${withdrawmethod.method}`,
                        type:`${withdrawmethod.type}`,
                        percent:`${withdrawmethod.percent}`,
                        plan:`${withdrawmethod.type}`,
                        duration:`${withdrawmethod.duration}`
                      })
                      setShowModal(true)
                    }}>choose plan</button>
                  </SwiperSlide>
                  ))}
                </Swiper>
            </div>
            <button className="history-btn" onClick={()=>{
              navigate('/investments')
            }}>
              investment history
              <FiArrowRight />
            </button>
        </div>
    </div>
  </>
  )
}

export default Userdashboardplans

