import React from 'react'
import Userdashboardheader from '../userdashboardheader/Userdashboardheader'
import Loader from '../Loader'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoMdNotifications } from "react-icons/io";
import { FaUserAlt, FaAngleDown } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { AiOutlineArrowLeft } from "react-icons/ai";
import './userdashboardcopytrade.css'
import MobileDropdown from '../MobileDropdown'

const UserdashboardCopytrade = ({ route }) => {
  const [loader, setLoader] = useState(false)
  const [userData, setUserData] = useState()
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

          </div>
        </div>
        {userData && userData.trades.length !== 0 ?
          <div className="page-swiper-wrapper trans-page">
            <MobileDropdown showStatus={showMobileDropdown} route={route} closeMenu={closeMobileMenu} />
            <div className="floating-btn trans-page-float" onClick={() => {
              navigate('/dashboard')
            }}>
              <AiOutlineArrowLeft />
            </div>
            <div className="page-header">
              <h3>checkout your trade logs</h3>
              <h2>trade logs</h2>
              <p>we keep track of all the trades taken by your trader</p>
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
                    userData.trades.map(refer =>
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
          <div className="empty-page">
            <MobileDropdown showStatus={showMobileDropdown} route={route} closeMenu={closeMobileMenu} />
            <img src="/preview.gif" alt="" className='empty-img dash-empty-img' />
            <p>Your Trader has not placed any trades yet. Trades taken by your trader would be displayed here when available.</p>
            <Link to='/fundwallet'>deposit</Link>
          </div>
        }
      </section>
    </main>
  )
}

export default UserdashboardCopytrade