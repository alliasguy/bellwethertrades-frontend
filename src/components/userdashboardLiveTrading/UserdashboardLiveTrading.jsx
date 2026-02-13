import React from 'react'
import Userdashboardheader from '../userdashboardheader/Userdashboardheader'
import Loader from '../Loader'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoMdNotifications } from "react-icons/io";
import { FaUserAlt, FaAngleDown } from "react-icons/fa";
import Livechart from '../Livechart'
import TickerTape from '../Tickertape'
import './Userdashboardlivetrading.css'
import { MdOutlineLockClock } from "react-icons/md";
import MobileDropdown from '../MobileDropdown'

const UserdashboardLiveTrading = ({route}) => {
    const [loader, setLoader] = useState(false)
  const [userData, setUserData] = useState()
  const [showMobileDropdown, setShowMobileDropdown] = useState(false)
  const [showLockedMessage,setShowLockedMessage] = useState(false)
          const navigate = useNavigate()
          
          useEffect(() => {
            const getData = async () => {
              try {
                setLoader(true);
          
                // Check if a token exists
                  const token = localStorage.getItem('token');
                  console.log(token)
                if (!token) {
                  navigate('/login');
                  return;
                }
          
                // Fetch user data from the API
                const response = await fetch(`${route}/api/getData`, {
                  headers: {
                    'x-access-token': token,
                    'Content-Type': 'application/json',
                  },
                });
          
                // Parse the response
                const data = await response.json();
          
                // Handle errors from the API
                if (data.status === 'error') {
                  localStorage.removeItem('token'); // Clear invalid token
                  navigate('/login');
                } else {
                  setUserData(data); // Set user data
                }
              } catch (error) {
                console.error('Error fetching user data:', error);
                navigate('/login'); // Navigate to login on failure
              } finally {
                setLoader(false); // Stop loader
              }
            };
          
            getData();
          }, [navigate, route]);
  
  const closeMobileMenu = () => {
    setShowMobileDropdown(false)
  }
  
  return (
    <main className='homewrapper'>
         {
           loader &&
             <Loader />
         }
       <Userdashboardheader />
         <section className='dashboardhomepage'>
            <div className="dashboardheaderwrapper">
                <div className="header-notification-icon-container">
                    <IoMdNotifications />
                </div>
                <div className="header-username-container">
                  <h3>Hi, {userData ? userData.firstname : ''}</h3>
                </div>
                <div className="header-userprofile-container">
                  <div className="user-p-icon-container">
                    <FaUserAlt/>
                  </div>
                  <div className="user-p-drop-icon" onClick={() => { setShowMobileDropdown(!showMobileDropdown); }
                    }>
                      <FaAngleDown />
                    </div>
                    <MobileDropdown showStatus={showMobileDropdown} route={route} closeMenu={closeMobileMenu} />
                </div>
        </div>
        {
          userData && userData.verified ?
          <>
              <TickerTape />
                  <div className="userdashboard-live-chart-container">
              <Livechart />
            </div>
            </> :
            <div className="locked-section">
              <video src="/chart-big.hvc1.6af4110d38611a03c3a4.mp4" autoPlay controls loop alt="" className="locked-img" />
              <div className="locked-text-container">
                <p>Live trading sessions that provide real-time insights into market strategies and techniques. participants can engage directly with their master traders, other experienced traders; ask questions and observe trading decisions as they play out, helping build confidence and practical skills in a dynamic environment.</p>
              </div>
              <div className="locked-btn-container">
                  <button class="locked-button" onClick={()=>setShowLockedMessage(true)}>
                      <MdOutlineLockClock />
                      UnLock!
                  </button>
              </div>
            </div>
        }
        
      </section>
      {
          showLockedMessage && 
          <div className="locked-message-modal-container">
              <div class="locked-modal">
                <div class="locked-modal-header">
                  <div class="locked-modal-image">
                    <svg
                      aria-hidden="true"
                      stroke="currentColor"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                        stroke-linejoin="round"
                        stroke-linecap="round"
                      ></path>
                    </svg>
                  </div>
                  <div class="locked-modal-content">
                    <span class="locked-modal-title">Restricted Function!!!</span>
                    <p class="locked-modal-message">
                      Your account has not attained PDT level to unlock this feature. Kindly reach out to our support team via email or live chat.
                    </p>
                  </div>
                  <div class="locked-modal-actions">
                    <button class="locked-modal-cancel" type="button" onClick={()=>setShowLockedMessage(false)}>close</button>
                  </div>
                </div>
              </div>
          </div>
        }
      </main>  
  )
}

export default UserdashboardLiveTrading