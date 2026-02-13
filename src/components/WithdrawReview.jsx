import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Userdashboardheader from './userdashboardheader/Userdashboardheader'
import './userdashboardwithdraw/userdashboardwithdraw.css'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import Loader from './Loader'
const WithdrawReview = ({ Active, withdrawAmount, closepage, route, funded }) => {
    const [active, setActive] = useState(Active)
    const [wallet, setWallet] = useState()
    const [amount, setAmount] = useState(withdrawAmount)
    const [loader, setLoader] = useState(false)

    const navigate = useNavigate()
    useEffect(() => {
        if (Active === undefined) {
            navigate('/fundwallet')
        }
    }, [])

    // sweet Alert code 

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

    const withdraw = async () => {
        setLoader(true)
        const token = localStorage.getItem('token')
        const req = await fetch(`${route}/api/withdraw`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify({
                wallet: wallet,
                WithdrawAmount: amount,
                method: active.method
            })
        })
        const res = await req.json()
        setLoader(false)
        if (res.status === 'ok') {
            Toast.fire({
                icon: 'success',
                title: `You have successfully placed your withdrawal of ${res.withdraw}. kindly wait for few minutes to be approved by management,Thanks!`
            })

            const data = {
                service_id: 'service_2lz1hwa',
                template_id: 'template_jxf88n9',
                user_id: 'lvr1ol7yRVzEzVjQ3',
                template_params: {
                    'name': `${res.name}`,
                    'email': `${res.email}`,
                    'message': `${res.message}`,
                    'reply_to': `support@bellwethertrades.com`,
                    'subject': `${res.subject}`
                }
            };
            const adminData = {
                service_id: 'service_2lz1hwa',
                template_id: 'template_jxf88n9',
                user_id: 'lvr1ol7yRVzEzVjQ3',
                template_params: {
                    'name': `Bro`,
                    'email': `support@bellwethertrades.com`,
                    'message': `${res.adminMessage}`,
                    'reply_to': `${res.email}`,
                    'subject': `${res.subject}`
                }
            };

            const sendMail = async () => {
                await Promise.all([fetch('https://api.emailjs.com/api/v1.0/email/send', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data),
                }),
                fetch('https://api.emailjs.com/api/v1.0/email/send', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(adminData),
                })
                ])
            }
            sendMail()
            setWallet('')
        }

        else {
            Toast.fire({
                icon: 'warning',
                title: `${res.withdrawMessage}`
            })
            const data = {
                service_id: 'service_2lz1hwa',
                template_id: 'template_jxf88n9',
                user_id: 'lvr1ol7yRVzEzVjQ3',
                template_params: {
                    'name': `${res.name}`,
                    'email': `${res.email}`,
                    'message': `${res.withdrawMessage}`,
                    'reply_to': `support@bellwethertrades.com`,
                    'subject': `${res.subject}`
                }
            };
            const sendMail = async () => {
                await fetch('https://api.emailjs.com/api/v1.0/email/send', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data),
                })
            }
            sendMail()

            setWallet('')
        }
    }
    return (
        <div>
            {/* <Userdashboardheader route={route}/> */}
            {
                loader &&
                <Loader />
            }
            <div className="checkout-page">
                <div className="floating-btn" onClick={() => {
                    closepage()
                }}>
                    <AiOutlineArrowLeft />
                </div>
                <h3>Withdrawal Preview</h3>
                <p>Review withdrawal details.</p>
                <div className="withdrawal-review-container">
                    <div className="left-withdrawal-review-card">
                        <div className="review-left-card-tab">
                            <p>Current Balance: <b>{Math.round(funded).toLocaleString()} USD</b></p>
                        </div>
                        <div className="review-left-card-tab">
                            <p>Request Balance: <b>{amount ? amount : ''} USD</b></p>
                        </div>
                        <div className="review-left-card-tab">
                            <p>Withdrawal Charge: <b>0 USD</b></p>
                        </div>
                        <div className="review-left-card-tab">
                            <p>After Charge: <b>0 USD</b> </p>
                        </div>
                        <div className="review-left-card-tab">
                            <p>Conversion Rate: <b>1 USD = 1 USD</b></p>
                        </div>
                        <div className="review-left-card-tab">
                            <p>You Will Get: <b>{amount ? amount : ''} USD</b></p>
                        </div>
                        <div className="review-left-card-tab">
                            <p>Balance Will be: <b>{Math.round(funded - amount).toLocaleString()} USD</b></p>
                        </div>

                    </div>
                    <div className="right-withdrawal-review-card">
                        <p>Please enter you <b>{active ? active.method : ''}</b>  Wallet address below</p>
                        <form action="" className="review-withdraw-form" onSubmit={(e) => {
                            e.preventDefault()
                            withdraw()
                        }}>
                            <label htmlFor="wallet">wallet address</label>
                            <input type="text" id='wallet' placeholder='wallet address' onChange={(e) => {
                                setWallet(e.target.value)
                            }} required value={wallet} />
                            <input type="submit" value="confirm" className='confirm-withdraw-btn' />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WithdrawReview