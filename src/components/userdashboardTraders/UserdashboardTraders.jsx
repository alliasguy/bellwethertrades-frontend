import React from 'react'
import Userdashboardheader from '../userdashboardheader/Userdashboardheader'
import './userdashboardtraders.css'
import Loader from '../Loader'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoMdNotifications } from "react-icons/io";
import { FaUserAlt, FaAngleDown } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { MdCandlestickChart } from "react-icons/md";
import { MdOutlineShowChart } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import Swal from 'sweetalert2'
import MobileDropdown from '../MobileDropdown'
const UserdashboardTraders = ({route}) => {
  const [loader, setLoader] = useState(false)
  const [showTrader, setShowTrader] = useState(false)
  const [activeTrader, setActiveTrader] = useState({})
  const [showMobileDropdown,setShowMobileDropdown] = useState(false)
  const [search, setSearch] = useState("");
  const [traders, setTraders] = useState([])
  const [myTrader,setMyTrader] = useState(null)

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
  
      const [userData, setUserData] = useState({})
      const navigate = useNavigate()
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
  
  const fetchTraders = async () => {
    const req = await fetch(`${route}/api/fetchTraders`,{
      headers:{
        'Content-Type':'application/json'
      }
    })
    const res = await req.json()
    setLoader(false)
    if(res.status === 200){
      setTraders(res.traders)
    }
    else{
      setTraders([])
    }
  }

      useEffect(() => {
        getData();
        fetchTraders()
        
      }, [navigate, route])
  
  
  useEffect(() => {
    // Run this only when both traders and userData.trader are ready
    if (traders.length > 0 && userData?.trader) {
      const target = traders.find(
        (trader) => trader._id === userData.trader
      );

      console.log("Filtered trader:", target);
      setMyTrader(target);
    }
  }, [traders, userData]); // dependencies


  //filtered version of traders array

  const filteredTraders = traders.filter(
  (trader) =>
    trader.firstname.toLowerCase().includes(search.toLowerCase()) ||
    trader.lastname.toLowerCase().includes(search.toLowerCase())
  );

  

  const copyTrade = async (trader) => {
    if (userData.funded >= trader.minimumcapital) {
      setLoader(true)
      console.log(trader._id)
    const req = await fetch(`${route}/api/copytrade`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'x-access-token': localStorage.getItem('token')
      },
      body: JSON.stringify({
        trader:trader._id
      }),
    })
      const res = await req.json()
      
    
    if (res.status === 200) {
      Toast.fire({
      icon: 'success',
      title: `${res.message}`,
      });
      getData();
      setLoader(false)
    }
    else {
      Toast.fire({
      icon: 'error',
      title: `${res.message}`,
      });
      getData();
      setLoader(false)
    }
    }
    else {
      Toast.fire({
      icon: 'error',
      title: `Capital not Enough to Copy Trade`,
      });
    }
  }

  const stopcopyTrade = async (trader) => {
    
      setLoader(true)
    const req = await fetch(`${route}/api/stopcopytrade`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'x-access-token': localStorage.getItem('token')
      },
      body: JSON.stringify({
        trader:trader._id
      }),
    })
      const res = await req.json()
      
    
    if (res.status === 200) {
      Toast.fire({
      icon: 'success',
      title: `${res.message}`,
      });
      
      getData();
      setLoader(false)
    }
    else {
      Toast.fire({
      icon: 'error',
      title: `${res.message}`,
      });
      getData();
      setLoader(false)
    }
  }


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
                
              </div>
            </div>
        {
          showTrader && activeTrader ?
          <div className="trader-profile-page">
              <div className="trader-page-close-btn" onClick={()=> setShowTrader(false)}>
                <IoIosArrowBack />
              </div>
              <div className="trader-profile-container">
                <div className="trader-profile-card">
                <div className="trader-card-header">
                  <div className="trader-card-image-container">
                  <img src={`${activeTrader.traderImage}`} alt="" className='trader-card-image' />
                  </div>
                  <div className="trader-card-text-container">
                    <h3 className="trader-name">{activeTrader.firstname}</h3>
                    <p className="trader-description">{activeTrader.lastname}</p>
                  </div>
                </div>
                <div className="trader-perfomance-container">
                  <div className="trader-performance">
                    <div className="trader-performance-item">
                      <p className="performance-label">Win Rate</p>
                      <p className="performance-value"><MdCandlestickChart /> {activeTrader.profitrate}%</p>
                    </div>
                    <div className="trader-performance-item">
                      <p className="performance-label">Average Return</p>
                      <p className="performance-value"><MdOutlineShowChart /> {activeTrader.averagereturn}</p>
                    </div>
                    <div className="trader-performance-item">
                      <p className="performance-label">followers </p>
                      <p className="performance-value"> {activeTrader.followers}</p>
                    </div>
                    <div className="trader-performance-item">
                      <p className="performance-label">minimum Risk/Reward Ratio </p>
                      <p className="performance-value">{activeTrader.rrRatio}</p>
                    </div>
                    <div className="trader-performance-item">
                      <p className="performance-label">minimum Trading Capital </p>
                      <p className="performance-value">{activeTrader.minimumcapital}</p>
                    </div>
                  </div>
                  <div className="trader-performance-btn-container">
                    <button className='trader-card-btn' onClick={() =>copyTrade(activeTrader)}>copy trade</button>
                  </div>
                </div>
              </div>
              </div>
            </div> : ''
        }
        {
          !showTrader && 
          <section className='trader-show-case-wrapper'>
          <MobileDropdown showStatus={showMobileDropdown} route={route} closeMenu={closeMobileMenu} />
          <div className="traders-showcase">
            <h2 className="traders-showcase-header">expert traders</h2>
            <p>choose from the list of our expert traders. Any trader you select would trade and manage your portfolio.</p>
            </div>
            { myTrader && 
                    <div className="active-trader-container" >
                      <div className="videoframe-text-container treader-header">
                        <h1>Your current <span className="highlight">trader</span></h1>
                      </div>
                      <div className="traders-card active-trader-card">
                        <div className="trader-card-header active-trader-card-header">
                          <div className="trader-card-image-container">
                            <img src={`${myTrader.traderImage}`} alt="" className='trader-card-image' />
                          </div>
                          <div className="trader-card-text-container">
                            <h3 className="trader-name">{myTrader.firstname}</h3>
                            <p className="trader-description">{myTrader.lastname}</p>
                            <button onClick={()=>stopcopyTrade(myTrader)}>stop copying</button>
                          </div>
                        </div>
                        <div className="trader-perfomance-container">
                          <div className="trader-performance">
                            <div className="trader-performance-item">
                              <p className="performance-label">Win Rate</p>
                              <p className="performance-value"><MdCandlestickChart /> {myTrader.profitrate}%</p>
                            </div>
                            <div className="trader-performance-item">
                              <p className="performance-label">Average Return</p>
                              <p className="performance-value"><MdOutlineShowChart /> {myTrader.averagereturn}</p>
                            </div>
                            <div className="trader-performance-item">
                              <p className="performance-label">Minimum trading capital</p>
                              <p className="performance-value"><MdOutlineShowChart /> ${myTrader.minimumcapital}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  
              
                    
            }
            
          <div className="traders-section">
            <div className="videoframe-text-container treader-header">
              <h1>choose a <span className="highlight">trader</span></h1>
              <div className="search-input-container">
                <span className='search-btn'><FiSearch /></span>
                <input
                  type="text"
                  placeholder="search for a trader"
                  className="search-input"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="traders-card-container">
                { 
                  filteredTraders.map(trader =>
                    <div className="traders-card">
                        <div className="trader-card-header">
                          <div className="trader-card-image-container">
                          <img src={`${trader.traderImage}`} alt="" className='trader-card-image' />
                          </div>
                          <div className="trader-card-text-container">
                            <h3 className="trader-name">{trader.firstname}</h3>
                            <p className="trader-description">{trader.lastname}</p>
                          </div>
                        </div>
                        <div className="trader-perfomance-container">
                          <div className="trader-performance">
                            <div className="trader-performance-item">
                              <p className="performance-label">Win Rate</p>
                              <p className="performance-value"><MdCandlestickChart /> {trader.profitrate}%</p>
                            </div>
                            <div className="trader-performance-item">
                              <p className="performance-label">Average Return</p>
                              <p className="performance-value"><MdOutlineShowChart /> {trader.averagereturn}</p>
                            </div>
                            <div className="trader-performance-item">
                              <p className="performance-label">Minimum trading capital</p>
                              <p className="performance-value"><MdOutlineShowChart /> ${trader.minimumcapital}</p>
                            </div>
                          </div>
                          <div className="trader-performance-btn-container">
                          <button className='trader-card-btn' onClick={() => {
                            setActiveTrader(
                            {
                              firstname: trader.firstname,
                              lastname: trader.lastname,
                              profitrate: trader.profitrate,
                              averagereturn: trader.averagereturn,
                              followers: trader.followers,
                              rrRatio: trader.rrRatio,
                              nationality: trader.nationality,
                              minimumcapital: trader.minimumcapital,
                              traderImage: trader.traderImage,
                              tradehistory:trader.tradehistory
                              })
                            setShowTrader(true)
                          }}>view profile</button>
                          <button className='trader-card-btn' onClick={() =>copyTrade(trader)}>copy trade</button>
                          </div>
                        </div>
                      </div>
                  )
              }
              
            </div>
          </div>
        </section>
        }
        </section>
    </main>  
  )
}

export default UserdashboardTraders