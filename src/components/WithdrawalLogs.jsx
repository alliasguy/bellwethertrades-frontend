import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import Userdashboardheader from '../components/userdashboardheader/Userdashboardheader'
import {AiOutlineArrowLeft} from 'react-icons/ai'
import Loader from './Loader'
const WithdrawalLogs = ({route}) => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState()
  const [loader,setLoader] = useState(false)

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
  },[])
  return (
    <div>
      
    {/* <Userdashboardheader route={route}/> */}
    {
        loader && 
          <Loader />
      }
      {userData && userData.withdraw.length !== 0 ? 
      <div className="page-swiper-wrapper" >
        <div className="floating-btn" onClick={()=>{
        navigate('/withdraw')
      }}>
          <AiOutlineArrowLeft />
        </div>
      <div className="page-header">
          <h3>checkout your withdrawal logs</h3>
          <h2>Withdrawal logs</h2>
          <p>we keep track of all your withdrawals</p>
      </div>
      <div className="transaction-container no-ref">
        <table>
            <thead>
              <tr>
                <td>Date</td>
                <td>amount</td>
                <td>id</td>
                <td>balance</td>
                <td>status</td>
              </tr>
            </thead>
            <tbody>
              {
                userData.withdraw.map(refer =>
                  <tr>
                    <td>{refer.date}</td>
                    <td>$ {refer.amount} USD</td>
                    <td>{refer.id} </td>
                    <td>$ {refer.balance} USD</td>
                    <td>approved</td>
                  </tr>
                )
              }
            </tbody>
          </table>
          </div>
        </div>
      :
        <div className="page-swiper-wrapper">
          <div className="floating-btn" >
            <Link to='/dashboard'>
              <AiOutlineArrowLeft />
            </Link>    
          </div>
      <div className="failure-page no-referral-page">
        <img src="/view.gif" alt="" className='failure-img'/>
        <p>You have not performed any withdrawals yet. click below to deposit and start transacting.</p>
        <Link to='/fundwallet'>deposit</Link>
      </div>
      </div>
      }
     
</div>
  )
}

export default WithdrawalLogs