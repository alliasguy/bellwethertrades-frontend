import React from 'react'
import { useState,useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'
const VerifyEmail = ({route}) => {
    const [loader,setLoader] = useState(true)
    const params = useParams()
    const navigate = useNavigate()
    useEffect(() => {
                    setLoader(true)
                    const referUser = async()=>{
                    try {
                        const url = `${route}/${params.id}/refer`
                        const req = await fetch(url,{
                            headers:{
                                'Content-Type':'application/json'
                            }
                        })
                        const res = await req.json()
                        setLoader(false)
                        if (res.status === 400) {
                            navigate('/signup')
                        }
                        else {
                            navigate('/signup')
                            localStorage.setItem('referedUser',res.referredUser)
                        }
                    } catch (error) {
                    console.log(error)
                    setLoader(false)
                    navigate('/signup')
                        }
            }
            // const verifyEmailUrl = async()=>{
            //     try {
            //         const url = `${route}/${params.id}/verify/${params.token}`
            //         const req = await fetch(url,{
            //             headers:{
            //                 'Content-Type':'application/json'
            //             }
            //         })
            //         const res = await req.json()
            //         console.log(res)
            //         setValiUrl(true)
            //     } catch (error) {
            //         console.log(error)
            //         setValiUrl(false)
            //     }
            // }
            referUser()
    },[params])
    return (
    <>
        {
            
           loader && <Loader />
    }
    </>    
  )
}

export default VerifyEmail