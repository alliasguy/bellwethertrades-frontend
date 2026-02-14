import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdOutlineContentCopy, MdOutlineDone } from 'react-icons/md'
import { FiUsers, FiLink, FiAward } from 'react-icons/fi'
import { LuUsers, LuUserCheck, LuWallet } from "react-icons/lu";
import Userdashboardheader from '../userdashboardheader/Userdashboardheader'
import './userdashboardreferrals.css'
import Loader from '../Loader'

const Userdashboardreferrals = ({ route }) => {
  const [clipBoard, setClipBoard] = useState(false)
  const [loader, setLoader] = useState(false)
  const [userData, setUserData] = useState()
  const clipRef = useRef(null)
  const navigate = useNavigate()

  const copy = () => {
    if (clipRef.current) {
      navigator.clipboard.writeText(clipRef.current.value)
      setClipBoard(true)
      setTimeout(() => setClipBoard(false), 2000)
    }
  }

  useEffect(() => {
    setLoader(true)
    const token = localStorage.getItem('token')
    if (token) {
      const getData = async () => {
        try {
          const req = await fetch(`${route}/api/getData`, {
            headers: {
              'x-access-token': token
            }
          })
          const res = await req.json()
          if (res.status === 'error') {
            navigate('/login')
          } else {
            setUserData(res)
          }
        } catch (error) {
          console.error("Error fetching data:", error)
        } finally {
          setLoader(false)
        }
      }
      getData()
    } else {
      navigate('/login')
    }
  }, [route, navigate])

  return (
    <div className='homewrapper'>
      <Userdashboardheader route={route} />
      {loader && <Loader />}

      <div className="referral-page-container">
        <div className="referral-hero-section" data-aos="fade-up">
          <div className="referral-hero-text">
            <h1>Refer & <span className="highlight">Earn</span></h1>
            <p>Invite your friends to join <b>SignalSynch</b> and earn <b>10% commission</b> on every deposit they make. Build your network and watch your earnings grow!</p>
          </div>
          <div className="referral-link-card">
            <p>Your unique referral link</p>
            <div className="referral-input-group">
              <FiLink className="link-icon" />
              <input
                type="text"
                readOnly
                value={userData ? `signalsynch.com/user/${userData.username || userData.referral}` : 'Loading...'}
                ref={clipRef}
              />
              <button className={`copy-btn ${clipBoard ? 'success' : ''}`} onClick={copy}>
                {clipBoard ? <MdOutlineDone /> : <MdOutlineContentCopy />}
                <span>{clipBoard ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="referral-stats-grid">
          <div className="stat-card" data-aos="fade-up" data-aos-delay="100">
            <div className="stat-icon-wrapper users">
              <FiUsers />
            </div>
            <div className="stat-info">
              <h3>{userData ? userData.referred.length : '0'}</h3>
              <p>Total Referrals</p>
            </div>
          </div>
          <div className="stat-card" data-aos="fade-up" data-aos-delay="200">
            <div className="stat-icon-wrapper bonus">
              <LuWallet />
            </div>
            <div className="stat-info">
              <h3>${userData ? userData.refBonus || '0' : '0'}</h3>
              <p>Total Commission</p>
            </div>
          </div>
          <div className="stat-card" data-aos="fade-up" data-aos-delay="300">
            <div className="stat-icon-wrapper active">
              <FiAward />
            </div>
            <div className="stat-info">
              <h3>10%</h3>
              <p>Commission Rate</p>
            </div>
          </div>
        </div>

        {userData && userData.referred.length > 0 ? (
          <div className="referral-logs-section" data-aos="fade-up">
            <div className="section-header">
              <h2>Referral Logs</h2>
              <p>Track your referred users and earnings in real-time.</p>
            </div>
            <div className="referral-table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Joined At</th>
                    <th>Status</th>
                    <th>Commission</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.referred.map((refer, index) => (
                    <tr key={index}>
                      <td>
                        <div className="user-name-cell">
                          <div className="user-avatar">
                            {(refer.firstname || 'U').charAt(0)}
                          </div>
                          <span>{refer.firstname} {refer.lastname}</span>
                        </div>
                      </td>
                      <td>{refer.email}</td>
                      <td>{refer.date || 'N/A'}</td>
                      <td>
                        <span className="status-badge active">Active</span>
                      </td>
                      <td className="commission-cell">${refer.refBonus || '0'} USD</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="empty-referral-state" data-aos="fade-up">
            <div className="empty-state-icon">
              <LuUsers />
            </div>
            <h3>No referrals yet</h3>
            <p>You haven't referred anyone yet. Share your link above to start earning commissions!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Userdashboardreferrals
