import React, { useState, useRef } from 'react'
import Userdashboardheader from './userdashboardheader/Userdashboardheader'
import { MdOutlineContentCopy, MdOutlineDone } from 'react-icons/md'
import { BsImageFill } from 'react-icons/bs'
import { BsUpload } from 'react-icons/bs'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { FiLink } from 'react-icons/fi'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import Loader from './Loader'
const Deposit = ({ amount, active, close, route }) => {
    const navigate = useNavigate()
    const [Active, setActive] = useState(active)
    const [clipBoard, setClipBoard] = useState(false)
    const [showImage, setShowImage] = useState()
    const clipRef = useRef(null)
    const [modal, setModal] = useState(false)
    const [loader, setLoader] = useState(false)

    // copy to clipboard function starts here 
    const copy = () => {
        navigator.clipboard.writeText(clipRef.current.value)
    }

    // upload proof image code starts here 

    const uploadProof = async (file) => {
        setModal(true)
        console.log(file)
        const formData = new FormData
        formData.append('file', file)
        formData.append('upload_preset', 'upload');
        const req = await fetch('https://api.cloudinary.com/v1_1/duesyx3zu/image/upload',
            {
                method: 'POST',
                body: formData,
            }
        )
        const res = await req.json()
        if (res) {
            setShowImage(res.secure_url)
            setModal(false)
        }
    }

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

    // send proof function starts here 

    const sendProof = async () => {
        setLoader(true)
        const req = await fetch(`${route}/api/sendproof`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify({
                amount: amount,
                method: Active.method
            })
        })
        const res = await req.json()

        if (res.status === 200) {
            setLoader(false)
            Toast.fire({
                icon: 'congrats',
                title: `You have successfully placed a deposit of ${amount}`
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
                    'subject': `${res.adminSubject}`
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
        }
        else if (res.status === 500) {
            Toast.fire({
                icon: 'error',
                title: 'user does not exist'
            })
        }
        else {
            Toast.fire({
                icon: 'error',
                title: 'internal server error'
            })
        }
    }

    return (
        <div>
            {
                loader &&
                <Loader />
            }
            {/* <Userdashboardheader route={route}/> */}
            <div className="checkout-page">
                <div className="floating-btn" onClick={() => {
                    close()
                }}>
                    <AiOutlineArrowLeft />
                </div>
                <h3>deposit confirm</h3>
                <p>confirm your deposit by uploading a proof of payment, after paying</p>
                <div className="checkout-info-container">
                    <p>You have requested <span className='bold'>{amount} USD</span> , Please pay <span className='bold'>{amount} USD</span>  for successful payment</p>
                    <h3>Please copy Link to copy wallet address and make payment</h3>
                    <div className="click-to-copy-container">
                        <span className='clipboard-btn'>
                            <FiLink />
                        </span>
                        <input type="text" value={Active.wallet} ref={clipRef} />
                        <span className={`clipboard-btn ${clipBoard ? <MdOutlineDone /> : ''}`} onClick={() => {
                            copy()
                            setClipBoard(!clipBoard)
                        }}>
                            {
                                clipBoard ?
                                    <MdOutlineDone /> : <MdOutlineContentCopy />
                            }
                        </span>
                    </div>
                    <div className="proof-container">
                        <form action="" className='proof-form' onSubmit={(e) => {
                            e.preventDefault()
                            sendProof()
                        }}>
                            <p>upload proof of payment</p>
                            <div className="proof-img-container">
                                {
                                    modal && <div className="ping-container"><div class="ping"></div></div>
                                }
                                {
                                    showImage === undefined && !modal ? <BsImageFill /> : <img src={`${showImage}`} alt="" className='proof-image' />
                                }
                            </div>
                            <label htmlFor="proof-img" className='proof-label'>
                                <BsUpload />
                                <input type="file" accept='.jpg, .png, .svg, .webp, .jpeg' name="images" id="proof-img" className='proof-input' required onChange={(e) => {
                                    const image = e.target.files[0]
                                    uploadProof(image)
                                }} />
                            </label>
                            <input type="submit" value="send proof" className='proof-submit-btn' />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Deposit