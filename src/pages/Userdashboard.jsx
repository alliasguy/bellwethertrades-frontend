import React from 'react'
import Userdashboardhomepage from '../components/userdashboardhomepage/Userdashboardhomepage'
const Userdashboard = ({route}) => {
  return (
    <main className='userdashboard-page'>
        <Userdashboardhomepage route={route}/>
    </main>
  )
}

export default Userdashboard