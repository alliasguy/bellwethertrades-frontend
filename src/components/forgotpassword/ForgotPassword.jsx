import React, { useState, useEffect } from 'react'
import './forgotpassword.css'
import { Link, useNavigate } from 'react-router-dom';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import Loader from '../Loader';
import Swal from 'sweetalert2'

const ForgotPassword = ({ route }) => {

  const navigate = useNavigate()
  const [loader, setLoader] = useState(false)
  const [email, setEmail] = useState()



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






  const sendMail = async () => {
    setLoader(true)
    const adminData = {
      service_id: 'service_y5q5bg4',
      template_id: 'template_afzn8vh',
      user_id: '7GqjR4AnJaLOlwQj6',
      template_params: {
        'name': `User`,
        'email': `${email}`,
        'message': `https://www.bellwethertrades.org/resetpassword/${email}`,
        'reply_to': `support@bellwethertrades.org`,
        'subject': `Password Reset`
      }
    };

    try {
      await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(adminData),
      })
      setLoader(false)
      Toast.fire({
        icon: 'success',
        title: 'password reset link sent to Email!'
      })
    } catch (error) {
      setLoader(false)

      Toast.fire({
        icon: 'error',
        title: 'error! something went wrong'
      })

    }

  }

  return (
    <section className='verifyPageSection'>
      {
        loader &&
        <Loader />
      }
      <div className="verifyPageTextWrapper">
        <IoMdCheckmarkCircleOutline />
        <h1>Email verification required</h1>
        <p>input your valid email attached to your account below</p>
        <form class="" onSubmit={(e) => {
          e.preventDefault()
          sendMail()
        }}>

          <div class="input_containers">
            <label class="input_labels" for="email_field">Email</label>
            <svg fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg" class="icont">
              <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="#141B34" d="M7 8.5L9.94202 10.2394C11.6572 11.2535 12.3428 11.2535 14.058 10.2394L17 8.5"></path>
              <path stroke-linejoin="round" stroke-width="1.5" stroke="#141B34" d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z"></path>
            </svg>
            <input onChange={(e) => {
              setEmail(e.target.value.trim().toLocaleLowerCase())
            }} value={email} placeholder="name@mail.com" title="Inpit title" name="input-name" type="email" className="input_field" id="email_field" required />
          </div>
          <button type='submit'>send link</button>
          <div class="separator">
          </div>
        </form>
      </div>
    </section>
  )
}

export default ForgotPassword