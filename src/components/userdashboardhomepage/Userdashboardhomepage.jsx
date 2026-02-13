import React from 'react'
import './userdashboardhomepage.css'
import '../userdashboardtransactions/userdashboardtransactions.css'
import { FaUserAlt, FaAngleDown } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { IoMdNotifications } from "react-icons/io";
import Loader from '../Loader'
import { IoCloseSharp } from "react-icons/io5";
import { RiLuggageDepositLine } from "react-icons/ri";
import Userdashboardheader from '../userdashboardheader/Userdashboardheader'
import { BiMoneyWithdraw } from "react-icons/bi";
import TeslaWidget from '../TeslaWidget'
import MobileDropdown from '../MobileDropdown';

const Userdashboardhomepage = ({ route }) => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState()
  const [loader, setLoader] = useState(false)
  const [showNotification, setShowNotification] = useState(true)
  const [showMobileDropdown, setShowMobileDropdown] = useState(false)
  const [dailyTrades, setDailyTrades] = useState([])
  const copy = () => {
    navigator.clipboard.writeText(clipRef.current.value)
  }
  const clipRef = useRef(null)
  // Helper to check if a date string is today
  const isToday = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  }


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

  useEffect(() => {
    // Run this only when both traders and userData.trader are ready
    if (userData?.trades.length > 0 && userData) {

      const dailytrades = userData.trades.filter(trade => isToday(trade.date))

      console.log("daily trades:", dailytrades);
      setDailyTrades(dailytrades);
    }
  }, [userData]);






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
            {
              showNotification && userData && userData.funded === 0 &&
              <span className="notification-counter">1</span>
            }
            <IoMdNotifications />
          </div>
          <div className="header-username-container">
            <h3>Hi, {userData ? userData.firstname : ''}</h3>
          </div>
          <div className="header-userprofile-container">
            <div className="user-p-icon-container">
              <FaUserAlt />
            </div>
            <div className="user-p-drop-icon" onClick={() => { setShowMobileDropdown(!showMobileDropdown); }
            }>
              <FaAngleDown />
            </div>

          </div>
        </div>
        {
          userData && showNotification && userData.funded === 0 ?
            <div className="notification-dashoboard-container">
              <div className="notification-card">
                <p>you have not deposited yet click <Link to='/fundwallet'>Here</Link> to make your first deposit</p>
                <div className="close-notification-container" onClick={() => setShowNotification(false)}>
                  <IoCloseSharp />
                </div>
              </div>
            </div>
            : ''
        }

        <div className="dashboard-overview-container">
          <MobileDropdown showStatus={showMobileDropdown} route={route} closeMenu={closeMobileMenu} />
          <div className="upper-overview-card">
            <div className="total-balance-container">
              <h2 className="main-balance">
                Total Balance
              </h2>
              <div className="amount">
                <h3>${userData ? Math.round(userData.funded).toLocaleString() : '0'}</h3>
                <span className="usd-btn">usd</span>
              </div>
            </div>
            <div className="overview-btn-container">
              <div className="deposit-btn-container">
                <Link to='/fundwallet' className='user-deposit-btn'>
                  <span>deposit</span>
                </Link>
                <Link to='/withdraw' className='user-deposit-btn'>
                  <span>withdraw</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="lower-overview-card-container">
            <div className="lower-overview-card">
              <div className="lower-card-icon-container">
                <RiLuggageDepositLine />
              </div>
              <div className="lower-card-text-container">
                <h3>total deposit</h3>
                <p>${userData ? userData.totaldeposit : '0'}.00</p>
              </div>
            </div>
            <div className="lower-overview-card">
              <div className="lower-card-icon-container">
                <BiMoneyWithdraw />
              </div>
              <div className="lower-card-text-container">
                <h3>total withdrawal</h3>
                <p>${userData ? userData.totalwithdraw : '0'}.00</p>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-chart-container">
          <TeslaWidget />
        </div>
        {/* <div className="referral-section">
                <div className="referral-card1">
                    <div className="referraltext-wrapper">
                        <div className="referral-text-container">
                            <h2>refer us and earn 10% of every downline deposit</h2>
                            <p>Use the bellow link to invite your friends.</p>
                        </div>
                        <button className="invite-btn">invite</button>
                    </div>
                    <div className="click-to-copy-container">
                        <span className='clipboard-btn'>
                            <FiLink />
                        </span>
                        <input type="text" value={userData ? `www.bellwethertrades.com/user/${userData.username ? userData.username : userData.referral}` : ''} ref={clipRef}/>
                        <span className={`clipboard-btn ${clipBoard ? <MdOutlineDone /> : ''}` } onClick={()=>{
                            copy()
                            setClipBoard(!clipBoard)
                              }}>   
                            {
                                clipBoard ?
                                <MdOutlineDone /> : <MdOutlineContentCopy />
                            }
                        </span>
                    </div>  
                </div>
                <div className="referral-card1">
                    <div className="referraltext-wrapper">
                        <div className="referral-text-container">
                            <h2>my referral</h2>
                        </div>
                        <div className="referral-text-container small-card">
                            <h2>{userData ? userData.referred.length : '      '}</h2>
                            <p>referred users</p>
                        </div>
                        <div className="referral-text-container small-card">
                            <h2>{userData ? userData.refBonus : '        '} USD</h2>
                            <p>referral commission</p>
                        </div>

                    </div>
                    <img src="/bar4.png" alt="" className="bar4" />
                </div>
            </div> */}
        <div className="current-rank-section">
          <div className="active-trader-container">
            <div className="videoframe-text-container treader-header">
              <h1>Your current <span className="highlight">Rank</span></h1>
            </div>
            <div className="traders-card active-trader-card">
              <div className="trader-card-header">
                <div className="trader-card-image-container">

                  <img src={`${userData
                    ? userData.totaldeposit > 20000
                      ? '/diamond.png'
                      : userData.totaldeposit > 5000
                        ? '/download-removebg-preview (2).png'  // Gold image
                        : '/images-removebg-preview.png'        // Silver image
                    : ''
                    }`}
                    alt=""
                    className='trader-card-image'
                  />
                </div>
                <div className="trader-card-text-container">
                  <h3 className="trader-name">{`${userData
                    ? userData.totaldeposit > 20000
                      ? 'Diamond'
                      : userData.totaldeposit > 5000
                        ? 'gold'  // Gold 
                        : 'silver'        // Silver 
                    : ''
                    }`} </h3>
                  <p className="trader-description">Rank</p>
                </div>
              </div>
              <div className="trader-perfomance-container">
                <div className="trader-performance">
                  <div className="trader-performance-item">
                    <p className="performance-label">capital Range</p>
                    <p className="performance-value my-value">{`${userData
                      ? userData.totaldeposit > 20000
                        ? '$20,001 - unlimited' //diamond
                        : userData.totaldeposit > 5000
                          ? '$5001- $20,000'  // Gold 
                          : '$0- $5,000'        // Silver 
                      : ''
                      }`}</p>
                  </div>
                  <div className="trader-performance-item">
                    <p className="performance-label">bonus</p>
                    <p className="performance-value my-value">{`${userData
                      ? userData.totaldeposit > 20000
                        ? '$500' //diamond
                        : userData.totaldeposit > 5000
                          ? '$100'  // Gold 
                          : '$50'   // Silver 
                      : ''
                      }`}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {userData && dailyTrades.length !== 0 ?
          <div className="page-swiper-wrapper trans-page">
            <div className="page-header">
              <h3>checkout your Daily trade logs</h3>
              <h2>Daily trade logs</h2>
              <p>we keep track of all the trades taken by your trader daily</p>
            </div>
            <div className="transaction-container no-ref">
              <table>
                <thead>
                  <tr>
                    <td>trade pair</td>
                    <td>amount</td>
                    <td>type</td>
                    <td>date</td>
                  </tr>
                </thead>
                <tbody>
                  {
                    dailyTrades.map(refer =>
                      <tr className='tr'>
                        <td>{refer.pair}</td>
                        <td>$ {Number(refer.amount).toFixed(2)} USD</td>
                        <td className={`${refer.tradeType === 'profit' ? 'profit' : 'loss'}`}> {refer.tradeType}</td>
                        <td>{refer.date}</td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </div>
          </div>
          :
          <div className="empty-page home-empty-page">
            <img src="/preview.gif" alt="" className='empty-img dash-empty-img' />
            <p>Your Trader has not placed any trades for your account Today. Trades taken by your trader  today would be displayed here when available.</p>
          </div>
        }
      </section>
    </main>
  )
}

export default Userdashboardhomepage

