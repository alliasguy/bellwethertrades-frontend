import React from 'react'
import Userdashboardheader from '../userdashboardheader/Userdashboardheader'
import Loader from '../Loader'
import { useState, useEffect, useRef } from 'react'
const UserdashboardSettings = () => {
    const [loader,setLoader] = useState(false)
  return (
   <main className='homewrapper'>
         {
           loader &&
             <Loader />
         }
       <Userdashboardheader />
         <section className='dashboardhomepage'>
           
            <div className="dashboardheaderwrapper"></div>
          </section>
        </main>
  )
}

export default UserdashboardSettings