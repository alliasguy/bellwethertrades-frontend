import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './header.css';
import { RiArrowDownSLine } from "react-icons/ri";
import { MdClose } from "react-icons/md";
const Header = () => {
    const [showModal, setShowModal] = useState(false);
    const [bgColor, setBgColor] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [showMarkets,setShowMarkets] = useState(false)
    const [showAnalytics,setShowAnalytics] = useState(false)
    const [showCompany,setShowCompany] = useState(false)
    const [showTrading,setShowTrading] = useState(false)

    const changeOnScroll = () => {
        if (window.scrollY >= 90) {
            setBgColor(true);
        } else {
            setBgColor(false);
        }
    };
    window.addEventListener('scroll', changeOnScroll);
    const navigate = useNavigate();

    const menuItems = [
        { name: "home", path: "/", dropdown: [] },
        { name: "about", path: "/about", dropdown: [] }, 
        { name: "markets", path: "/markets", dropdown: ["forex","futures", "indices", "stocks"] },
        { name: "analytics", path: "/faq", dropdown: ["news", "technical-analysis","heatmaps","watchlists"] },
        { name: "company", path: "/policy", dropdown: ["privacy-policy","team"] },
        { name: "trading", path: "/buy-crypto", dropdown: ["buy-crypto", "copytrade"] }
    ];

    return (
        <motion.header className={`${bgColor && 'scroll-color'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.65 }}
        >
            <div className="logo-container">
                <img src="/bellwetherlogo (3).png" alt="" className='txtlogo'/>
            </div>
            <nav>
                <ul>
                    {menuItems.map((item, index) => (
                        <li key={index}
                            className="relative"
                            onMouseEnter={() => item.dropdown.length > 0 && setOpenDropdown(index)}
                            onMouseLeave={(e) => {
                                if (!e.relatedTarget || !e.relatedTarget.closest(".drop-down-container")) {
                                    setOpenDropdown(null);
                                }
                            }}>
                            <Link to={item.path}>{item.name}</Link>
                            {openDropdown === index && item.dropdown.length > 0 && (
                                <div className="drop-down-container"
                                    onMouseEnter={() => setOpenDropdown(index)}
                                    onMouseLeave={() => setOpenDropdown(null)}
                                >
                                    <div className="drop-wrapper">
                                        {item.dropdown.map((subItem, subIndex) => (
                                            <Link key={subIndex} to={`/${subItem}`} className="dropdown-link">{subItem}</Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="sign-up-btn-container">
                <button className='signup-btn' onClick={() => { navigate('/login') }}><span>login</span></button>
            </div>
            <div className="mobile-menu-container" onClick={() => { setShowModal(!showModal) }}>
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
            </div>
            <div className={`overlay ${showModal ? 'showing-modal' : ''}`} >
                <div className="overlay-close-btn-container" onClick={()=> setShowModal(false)}>
                    <MdClose />
                </div>
                <div className="menu-card">
                    <div className="menu-card-image-conatiner">
                        <img src="/bellwetherlogo (3).png" alt="" className='mobile-logo'/> 
                    </div>
                    <ul className="list">
                        <li className="element"><Link to='/'>home</Link></li>
                        <li className="element"><Link to='/about'>about</Link></li>
                        <div className="market-dropdown" >
                            <p onClick={()=> setShowMarkets(!showMarkets)}>markets</p>
                            <div onClick={()=> setShowMarkets(!showMarkets)} className={`market-dropdown-svg-container ${showMarkets && 'rotate'}` }>
                                <RiArrowDownSLine />
                            </div>
                            <div className={`market-links ${showMarkets && 'show-markets'}`}>
                                <li className="element"><Link to='/forex'>forex</Link></li>
                                <li className="element"><Link to='/futures'>futures</Link></li>
                                <li className="element"><Link to='/indices'>indices</Link></li>
                                <li className="element"><Link to='/stocks'>stocks</Link></li>
                            </div>
                        </div>
                        <div className="market-dropdown" >
                            <p onClick={()=> setShowAnalytics(!showAnalytics)}>analytics</p>
                            <div onClick={()=> setShowAnalytics(!showAnalytics)} className={`market-dropdown-svg-container ${showAnalytics && 'rotate'}` }>
                                <RiArrowDownSLine />
                            </div>
                            <div className={`analytics-links ${showAnalytics && 'show-markets'}`}>
                                <li className="element"><Link to='/news'>news</Link></li>
                                <li className="element"><Link to='/technical-analysis'>technical analysis</Link></li>
                                <li className="element"><Link to='/heatmaps'>heatmaps</Link></li>
                                <li className="element"><Link to='/watchlists'>watchlists</Link></li>
                            </div>
                        </div>
                        <div className="market-dropdown" >
                            <p onClick={()=> setShowCompany(!showCompany)}>company</p>
                            <div onClick={()=> setShowCompany(!showCompany)} className={`market-dropdown-svg-container ${showCompany && 'rotate'}` }>
                                <RiArrowDownSLine />
                            </div>
                            <div className={`company-links ${showCompany && 'show-markets'}`}>
                                <li className="element"><Link to='/privacy-policy'>privacy policy</Link></li>
                                <li className="element"><Link to='/team'>team</Link></li>
                                <li className="element"><Link to='/faq'>faq</Link></li>
                            </div>
                        </div>
                        <div className="market-dropdown" >
                            <p onClick={()=> setShowTrading(!showTrading)}>trading</p>
                            <div onClick={()=> setShowTrading(!showTrading)} className={`market-dropdown-svg-container ${showTrading && 'rotate'}` }>
                                <RiArrowDownSLine />
                            </div>
                            <div className={`trading-links ${showTrading && 'show-markets'}`}>
                                <li className="element"><Link to='/buy-crypto'>buy crypto</Link></li>
                                <li className="element"><Link to='/copytrade'>copytrade</Link></li>
                            </div>
                        </div>
                        <li className="element"><Link to='/login'>login</Link></li>
                        <li className="element"><Link to='/signup'>signup</Link></li>
                    </ul>
                </div>
            </div>
        </motion.header>
    );
};

export default Header;
