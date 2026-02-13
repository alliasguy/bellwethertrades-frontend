import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import Userdashboardheader from '../userdashboardheader/Userdashboardheader'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import Loader from '../Loader'
const Deposit = ({route}) => {
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
              setLoader(false)
          }
          getData()
      }
      else{
          navigate('/login')
      }
    },[])
  return (
    <main className="homewrapper">
    {
        loader && 
        <Loader />
      }
      {userData && userData.deposit.length !== 0 && userData.deposit != [] ? 
      <div className="page-swiper-wrapper">
        <div className="floating-btn" onClick={()=>{
        navigate('/fundwallet')
      }}>
          <AiOutlineArrowLeft />
        </div>
      <div className="page-header">
          <h3>checkout your transaction logs</h3>
          <h2>Transaction logs</h2>
          <p>we keep track of all your transactions</p>
      </div>
      <div className="transaction-container no-ref">
        <table>
            <thead>
              <tr>
                <td>transaction Id</td>
                <td>type</td>
                <td>amount</td>
                <td>date</td>
                <td>balance</td>
              </tr>
            </thead>
            <tbody>
              {
                userData.deposit.map(refer =>
                  <tr>
                    <td>{refer.id}</td>
                    <td>{refer.type}</td>
                    <td>$ {refer.amount} USD</td>
                    <td>{refer.date}</td>
                    <td>$ {refer.balance} USD</td>
                  </tr>
                )
              }
            </tbody>
          </table>
          </div>
        </div>
      :
      <div className="page-swiper-wrapper">
      <div className="failure-page no-referral-page">
        <img src="/unold_icon1_animation_loop_f.gif" alt="" className='failure-img'/>
        <p>You have not performed any transaction yet. click below to deposit and start transacting.</p>
        <Link to='/fundwallet'>deposit</Link>
      </div>
      </div>
      }
     
</main>
  )
}

export default Deposit