import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlineClose } from 'react-icons/ai'
import { GiReceiveMoney } from 'react-icons/gi'
import { RxDashboard } from 'react-icons/rx'
import { FaRegChartBar } from 'react-icons/fa'
import { GrLineChart } from "react-icons/gr";
import { FiAward,FiUsers } from "react-icons/fi";
import { GrTransaction } from "react-icons/gr";
import { RiLuggageDepositLine } from 'react-icons/ri'
import { AiOutlineSetting, AiOutlineStock } from 'react-icons/ai'
import { RiLockPasswordLine } from 'react-icons/ri'
import { FiLogOut } from 'react-icons/fi'
const MobileDropdown = ({ route, showStatus, closeMenu }) => {
    const navigate = useNavigate()
    const [userData, setUserData] = useState()

    const logout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }
    useEffect(() => {
        if (localStorage.getItem('token')) {
            const getData = async () => {
                const req = await fetch(`${route}/api/getData`, {
                    headers: {
                        'x-access-token': localStorage.getItem('token')
                    }
                })
                const res = await req.json()
                setUserData(res)
            }

            getData()
        }
        else {
            navigate('/login')
        }

    }, [])
    return (
        <div className='m-drop-container'>
            {
                showStatus &&
                <div className="drop-down" onBlur={() => {
                    closeMenu()
                }}>
                    <div className="dropdown-tabs" onClick={() => {
                        closeMenu()
                    }}>
                        <AiOutlineClose />
                        <p>close</p>
                    </div>
                    <div className="dropdown-header">
                        <span className="profile-pic-container">
                            {userData && userData.profilepicture !== '' ? <img src={userData.profilepicture ? userData.profilepicture : ''} alt="" /> : userData.firstname.charAt(0)}
                        </span>
                        <span className="dropdown-user-details">
                            <p className='dropdown-name'>{userData ? userData.firstname : 'john doe'}</p>
                            <p className='dropdown-email'>{userData ? userData.email : 'johndoe@gmail.com'}</p>
                        </span>
                    </div>

                    <div className="dropdown-deposit-container">
                        <h3>total amount</h3>
                        <h2>${userData ? Math.ceil(Number(userData.funded)).toLocaleString() : ''} USD</h2>
                        <p>Trading Rank :   {userData && userData.totaldeposit >= 5000 ? "Gold" : 'Silver'}</p>
                    </div>
                    <div className="mobile-tabs">
                        <div className="dropdown-tabs" onClick={() => {
                            navigate('/dashboard')
                        }}>
                            <RxDashboard />
                            <p>dashboard</p>
                        </div>
                        <div className="dropdown-tabs" onClick={() => {
                            navigate('/fundwallet')
                        }}>
                            <GiReceiveMoney />
                            <p>deposit</p>
                        </div>
                        <div className="dropdown-tabs" onClick={() => {
                            navigate('/traders')
                        }}>
                            <AiOutlineStock />
                            <p>Copy Traders</p>
                        </div>
                        <div className="dropdown-tabs" onClick={() => {
                            navigate('/usercopytrade')
                        }}>
                            <FaRegChartBar />
                            <p>Copy Trading</p>
                        </div>
                        <div className="dropdown-tabs" onClick={() => {
                            navigate('/live-trading')
                        }}>
                            <GrLineChart />
                            <p>Live Trading</p>
                        </div>
                        <div className="dropdown-tabs" onClick={() => {
                            navigate('/transactions')
                        }}>
                            <GrTransaction />
                            <p>Transactions</p>
                        </div>
                        <div className="dropdown-tabs" onClick={() => {
                            navigate('/ranking')
                        }}>
                            <FiAward />
                            <p>Ranking</p>
                            </div>
                            <div className="dropdown-tabs" onClick={() => {
                            navigate('/referrals')
                        }}>
                            <FiUsers />
                            <p>Referrals</p>
                        </div>
                        <div className="dropdown-tabs" onClick={() => {
                            navigate('/withdraw')
                        }}>
                            <RiLuggageDepositLine />
                            <p>withdraw</p>
                        </div>
                    </div>
                    <div className="dropdown-tabs" onClick={() => {
                        navigate('/settings')
                    }}>
                        <AiOutlineSetting />
                        <p>settings</p>
                    </div>
                    <div className="dropdown-tabs" onClick={() => {
                        navigate('/passwordreset')
                    }}>
                        <AiOutlineSetting />
                        <p>password reset</p>
                    </div>
                    <div className="dropdown-tabs" onClick={() => {
                        navigate('/kyc')
                    }}>
                        <RiLockPasswordLine />
                        <p>kyc</p>
                    </div>

                    <div className="dropdown-tabs" onClick={() => {
                        logout()
                    }}>
                        <FiLogOut />
                        <p>logout</p>
                    </div>
                </div>
            }
        </div>
    )
}

export default MobileDropdown