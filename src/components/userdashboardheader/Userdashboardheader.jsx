import React , {useState,useEffect} from 'react'
import "./userdashboardheader.css"
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { GrLineChart } from "react-icons/gr";
import { FiAward } from "react-icons/fi";
import { GrTransaction } from "react-icons/gr";
import { MdAddchart } from "react-icons/md";
import { AiOutlineSafety } from "react-icons/ai";
import {AiOutlineSetting} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'
import {FaRegChartBar} from 'react-icons/fa'
const Userdashboardheader = ({route}) => {
    const navigate = useNavigate()
    const [userData, setUserData] = useState()

    const logout = ()=>{
        localStorage.removeItem('token')
        navigate('/login')
    }
    useEffect(()=>{
        if(localStorage.getItem('token')){
            const getData = async()=>{
                const req = await fetch(`${route}/api/getData`,{
                    headers: {
                    'x-access-token': localStorage.getItem('token')
                    }
                })
                const res = await req.json()
                setUserData(res)
                console.log(res)
            }
            
            getData()
        }
        else{
            navigate('/login')
        }
          
    },[])


    const [bgColor, setBgColor] = useState(false)
    const changeOnScroll = ()=>{
        if(window.scrollY >= 50){
            setBgColor(true)
        }
        else{
            setBgColor(false)
        }
    }
    window.addEventListener('scroll', changeOnScroll)
  return (
    <>
        <aside  className='userdashboard-sidebar'>
              <div className="dashboard-logo-container">
                  <img src="/bellwetherlogo (3).png" alt="" className="dashboard-logo"/>
            </div>
            <div className='dashboard-links-container'>
                  <li className="dashboard-links">
                      <div className="dashboard-svg-container">
                          <AiOutlineAppstoreAdd />
                      </div>
                      <Link to='/dashboard'>home</Link>
                  </li>
                  
                  <li className="dashboard-links">
                      <div className="dashboard-svg-container">
                          <MdAddchart />
                      </div>
                      <Link to='/traders'>copy traders</Link></li>
                  <li className="dashboard-links">
                      <div className="dashboard-svg-container">
                          <FaRegChartBar />
                      </div>
                      <Link to='/usercopytrade'>copy trading</Link></li>
                  <li className="dashboard-links">
                      <div className="dashboard-svg-container">
                          <GrLineChart />
                      </div>
                      <Link to='/live-trading'>live trading</Link></li>
                  <li className="dashboard-links">
                      <div className="dashboard-svg-container">
                          <GrTransaction />
                      </div>
                      <Link to='/transactions'>transactions</Link></li>
                    <li className="dashboard-links">
                      <div className="dashboard-svg-container">
                          <FiAward />
                      </div>
                      <Link to='/ranking'>ranking</Link>
                    </li>
                    <li className="dashboard-links">
                      <div className="dashboard-svg-container">
                          <AiOutlineSafety />
                      </div>
                      <Link to='/kyc'>kyc verification</Link>
                    </li>
                    <li className="dashboard-links">
                      <div className="dashboard-svg-container">
                          <AiOutlineSetting />
                      </div>
                      <Link to='/settings'>settings</Link>
                  </li>
                  <li className="dashboard-links">
                      <div className="dashboard-svg-container">
                          <AiOutlineSetting />
                      </div>
                      <Link to='/passwordreset'>password reset</Link>
                    </li>
                  <li className="dashboard-links">
                    <div className="dashboard-svg-container">
                        <FiLogOut />
                    </div>
                    <Link to='/login'>logout</Link>
                </li>
            </div>
        </aside>
    </>
  )
}

export default Userdashboardheader