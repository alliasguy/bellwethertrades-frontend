import React from 'react'
import Userdashboardheader from '../userdashboardheader/Userdashboardheader'
import Loader from '../Loader'
import { useState, useEffect, useRef } from 'react'
import { FaUserAlt, FaAngleDown } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import './userdashboardranking.css'
import MobileDropdown from '../MobileDropdown'

const UserdashboardRanking = ({ route }) => {
  const [userData, setUserData] = useState()
  const [loader, setLoader] = useState(false)
  const [showMobileDropdown, setShowMobileDropdown] = useState(false)
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
              <FaUserAlt />
            </div>
            <div className="user-p-drop-icon" onClick={() => { setShowMobileDropdown(!showMobileDropdown); }
            }>
              <FaAngleDown />
            </div>
            <MobileDropdown showStatus={showMobileDropdown} route={route} closeMenu={closeMobileMenu} />
          </div>
        </div>
        <div className="current-rank-section">
          <div className="active-trader-container">
            <div className="videoframe-text-container treader-header">
              <h1>Your current <span className="highlight">Rank</span></h1>
            </div>
            <div className="traders-card active-trader-card">
              <div className="trader-card-header">
                <div className="trader-card-image-container">
                  <img
                    src={`${userData
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

                  <div className="trader-card-text-container">
                    <h3 className="trader-name">
                      {userData
                        ? userData.totaldeposit > 20000
                          ? "diamond"
                          : userData.totaldeposit > 5000
                            ? "gold"
                            : "silver"
                        : ""}
                    </h3>
                  </div>

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
                    <p className="performance-value my-value"> {`${userData
                        ? userData.totaldeposit > 20000
                          ? '$500' //diamond
                          : userData.totaldeposit > 5000
                            ? '$100'  // Gold 
                            : '$50'        // Silver 
                        : ''
                      }`}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="videoframe-text-container treader-header">
          <h1>other <span className="highlight">Ranks</span></h1>
        </div>
        <div className="traders-card-container rank-plan-container">
          <div className="traders-card">
            <div className="trader-card-header">
              <div className="trader-card-image-container">
                <img src={`/images-removebg-preview.png`} alt="" className='trader-card-image' />
              </div>
              <div className="trader-card-text-container">
                <h3 className="trader-name">silver</h3>
                <p className="trader-description">Rank</p>
              </div>
            </div>
            <div className="trader-perfomance-container">
              <div className="trader-performance">
                <div className="trader-performance-item">
                  <p className="performance-label">capital Range</p>
                  <p className="performance-value my-value"> $0- $5,000</p>
                </div>
                <div className="trader-performance-item">
                  <p className="performance-label">bonus</p>
                  <p className="performance-value my-value"> $50</p>
                </div>
              </div>
              <div className="trader-performance-btn-container">
                <button className='trader-card-btn' onClick={() => { navigate('/withdraw') }}>downgrade</button>
              </div>
            </div>
          </div>
          <div className="traders-card">
            <div className="trader-card-header">
              <div className="trader-card-image-container">
                <img src={`/download-removebg-preview (2).png`} alt="" className='trader-card-image' />
              </div>
              <div className="trader-card-text-container">
                <h3 className="trader-name">Gold</h3>
                <p className="trader-description">Rank</p>
              </div>
            </div>
            <div className="trader-perfomance-container">
              <div className="trader-performance">
                <div className="trader-performance-item">
                  <p className="performance-label">capital Range</p>
                  <p className="performance-value my-value"> $5,001- $20,000</p>
                </div>
                <div className="trader-performance-item">
                  <p className="performance-label">bonus</p>
                  <p className="performance-value my-value"> $100</p>
                </div>
              </div>
              <div className="trader-performance-btn-container">
                <button className='trader-card-btn' onClick={() => { navigate('/fundwallet') }}>upgrade</button>
              </div>
            </div>
          </div>
          <div className="traders-card">
            <div className="trader-card-header">
              <div className="trader-card-image-container">
                <img src={`/diamond.png`} alt="" className='trader-card-image' />
              </div>
              <div className="trader-card-text-container">
                <h3 className="trader-name">diamond</h3>
                <p className="trader-description">Rank</p>
              </div>
            </div>
            <div className="trader-perfomance-container">
              <div className="trader-performance">
                <div className="trader-performance-item">
                  <p className="performance-label">capital Range</p>
                  <p className="performance-value my-value"> $20,001- $50,000</p>
                </div>
                <div className="trader-performance-item">
                  <p className="performance-label">bonus</p>
                  <p className="performance-value my-value" > $500</p>
                </div>
              </div>
              <div className="trader-performance-btn-container">
                <button className='trader-card-btn' onClick={() => { navigate('/fundwallet') }}>upgrade</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default UserdashboardRanking