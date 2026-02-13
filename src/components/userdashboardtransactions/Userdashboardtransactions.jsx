import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import Userdashboardheader from '../userdashboardheader/Userdashboardheader'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { IoMdNotifications } from "react-icons/io";
import { FaUserAlt, FaAngleDown } from "react-icons/fa";
import MobileDropdown from '../MobileDropdown'
import './userdashboardtransactions.css'
const Userdashboardtransactions = ({route}) => {

  const navigate = useNavigate()
  const [userData, setUserData] = useState()
  const [loader, setLoader] = useState(false)
  const [showMobileDropdown,setShowMobileDropdown] = useState(false)

  useEffect(()=>{
    setLoader(true)
    if(localStorage.getItem('token')){
        const getData = async()=>{
            const req = await fetch(`${route}/api/getData`,{
                headers: {
                'x-access-token': localStorage.getItem('token')
                }
            })
            const res = await req.json()
          setUserData(res)
           if (res.status === 'error') {
                    navigate('/login')
                }
            setLoader(false)
        }
        getData()
    }
    else{
        navigate('/login')
    }
  }, [])
  
  const closeMobileMenu = () => {
    setShowMobileDropdown(false)
    
  }

  return (
    <div className='homewrapper'>
      
    <Userdashboardheader route={route}/>
    {
        loader && 
          <div className="wifi-loader-container">
            <div class="loader">
              <span class="l">L</span>
              <span class="o">o</span>
              <span class="a">a</span>
              <span class="d">d</span>
              <span class="i">i</span>
              <span class="n">n</span>
              <span class="g">g</span>
              <span class="d1">.</span>
              <span class="d2">.</span>
            </div>
        </div>
      }
      {userData && userData.transaction.length !== 0 ? 
         <section className='dashboardhomepage'>       
          <div className="dashboardheaderwrapper">
            <div className="dashboardheaderwrapper">
                <div className="header-notification-icon-container">
                    <IoMdNotifications />
                </div>
                <div className="header-username-container">
                  <h3>Hi, {userData ? userData.firstname : ''}</h3>
                </div>
                <div className="header-userprofile-container" onClick={() => { setShowMobileDropdown(!showMobileDropdown); }
                  }>
                  <div className="user-p-icon-container">
                    <FaUserAlt/>
                  </div>
                  <div className="user-p-drop-icon" >
                  <FaAngleDown />
                </div>
                 
                </div>
              </div>
          </div>
      <div className="page-swiper-wrapper trans-page">
        <div className="floating-btn trans-page-float" onClick={()=>{
        navigate('/dashboard')
      }}>
          <AiOutlineArrowLeft />
        </div>
      <div className="page-header">
          <h3>checkout your transaction logs</h3>
          <h2>Transaction logs</h2>
          <p>we keep track of all your transactions</p>
      </div>
      <div className="transaction-container no-ref">
          <MobileDropdown showStatus={showMobileDropdown} route={route} closeMenu={closeMobileMenu} />
        <table>
            <thead>
              <tr>
                <td>transaction Id</td>
                <td>type</td>
                <td>amount</td>
                <td>date</td>
                <td>balance</td>
              </tr>
            </thead>
            <tbody>
              {
                userData.transaction.map(refer =>
                  <tr>
                    <td>{refer.id}</td>
                    <td>{refer.type}</td>
                    <td>$ {refer.amount} USD</td>
                    <td>{refer.date}</td>
                    <td>$ {refer.balance} USD</td>
                  </tr>
                )
              }
            </tbody>
          </table>
          </div>
          </div>
        </section>
        :
         <section className='dashboardhomepage'>       
        <div className="dashboardheaderwrapper">
          <div className="dashboardheaderwrapper">
              <div className="header-notification-icon-container">
                  <IoMdNotifications />
              </div>
              <div className="header-username-container">
                <h3>Hi, {userData ? userData.firstname : ''}</h3>
              </div>
              <div className="header-userprofile-container" onClick={() => { setShowMobileDropdown(!showMobileDropdown); }
                  }>
                <div className="user-p-icon-container">
                  <FaUserAlt/>
                </div>
                <div className="user-p-drop-icon">
                  <FaAngleDown />
                </div>
              </div>
            </div>
        </div>
        <div className="empty-page">
          <MobileDropdown showStatus={showMobileDropdown} route={route} closeMenu={closeMobileMenu} />
        <img src="/unold_icon1_animation_loop_f.gif" alt="" className='empty-img'/>
        <p>you have not performed any transaction yet</p> 
        <Link to='/fundwallet'>deposit</Link>
        </div>
      </section>
      }
  </div>
  )
}

export default Userdashboardtransactions