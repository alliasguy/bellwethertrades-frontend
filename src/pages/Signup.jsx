import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GrUserAdmin } from 'react-icons/gr'
import { BiUser } from 'react-icons/bi'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import Loader from '../components/Loader'
import { IoMdClose } from "react-icons/io";
const Signup = ({ route }) => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [firstname, setFirstname] = useState()
  const [username, setUserName] = useState('')
  const [lastname, setLastname] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const [loader, setLoader] = useState(false)
  const [showServerForm, setShowServerForm] = useState(false)
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [country, setCountry] = useState('');
  const [deviceName, setDeviceName] = useState('');

  useEffect(() => {
    // Get user's geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });

          try {
            // Fetch country name using reverse geocoding from Nominatim
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await res.json();
            if (data?.address?.country) {
              setCountry(data.address.country);
            }
          } catch (err) {
            console.warn('Could not fetch country from coordinates:', err);
          }
        },
        (error) => {
          console.warn('Geolocation not available or denied:', error);
        }
      );
    }

    // Detect OS and browser from userAgent
    const ua = navigator.userAgent;
    let os = 'Unknown OS';
    let browser = 'Unknown Browser';

    if (/windows/i.test(ua)) os = 'Windows';
    else if (/mac/i.test(ua)) os = 'MacOS';
    else if (/android/i.test(ua)) os = 'Android';
    else if (/linux/i.test(ua)) os = 'Linux';
    else if (/iphone|ipad/i.test(ua)) os = 'iOS';

    if (/chrome/i.test(ua) && !/edge|opr/i.test(ua)) browser = 'Chrome';
    else if (/firefox/i.test(ua)) browser = 'Firefox';
    else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browser = 'Safari';
    else if (/edge/i.test(ua)) browser = 'Edge';
    else if (/opr|opera/i.test(ua)) browser = 'Opera';

    setDeviceName(`${os} – ${browser}`);
  }, []);

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

  // Signup function
  const Signup = async () => {
    setLoader(true);

    try {
      const referringUser = localStorage.getItem('referedUser') || '';
      const response = await fetch(`${route}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstname,
          lastName: lastname,
          userName: username,
          password: password,
          email: email,
          referralLink: referringUser,
          server: activeServer,
          location,
          deviceName,
          country
        }),
      });

      const result = await response.json();
      setLoader(false);


      if (result.status === 'error') {
        Toast.fire({
          icon: 'warning',
          title: `${result.message}`,
        });
        return;
      }

      // Save token and navigate to dashboard
      localStorage.setItem('token', result.token);

      const userData = {
        service_id: 'service_y5q5bg4',
        template_id: 'template_yf2zs9k',
        user_id: '7GqjR4AnJaLOlwQj6',
        template_params: {
          'name': `${result.name}`,
          'email': `${result.email}`,
        }
      };

      const adminData = {
        service_id: 'service_y5q5bg4',
        template_id: 'template_afzn8vh',
        user_id: '7GqjR4AnJaLOlwQj6',
        template_params: {
          'name': `Bro`,
          'email': `support@bellwethertrades.org`,
          'message': `${result.message}`,
          'reply_to': `support@bellwethertrades.org`,
          'subject': `${result.adminSubject}`
        }
      };

      if (result.referringUser === null) {
        const sendMail = async () => {
          await Promise.all([
            await fetch('https://api.emailjs.com/api/v1.0/email/send', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(userData),
            }),
            await fetch('https://api.emailjs.com/api/v1.0/email/send', {
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
      else {
        const referringUserData = {
          service_id: 'service_y5q5bg4',
          template_id: 'template_afzn8vh',
          user_id: '7GqjR4AnJaLOlwQj6',
          template_params: {
            'name': `${result.referringUserName}`,
            'email': `${result.referringUserEmail}`,
            'message': `${result.referringUserMessage}`,
            'reply_to': `support@bellwethertrades.org`,
            'subject': `${result.subject}`
          }
        };
        const sendMail = async () => {
          await Promise.all([
            await fetch('https://api.emailjs.com/api/v1.0/email/send', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(userData),
            }),
            await fetch('https://api.emailjs.com/api/v1.0/email/send', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(referringUserData),
            }),
            await fetch('https://api.emailjs.com/api/v1.0/email/send', {
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
      Toast.fire({
        icon: 'success',
        title: 'Account successfully created!'
      })

      // Clear form and localStorage
      setFirstname('');
      setLastname('');
      setUserName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      localStorage.removeItem('referedUser');

      navigate('/dashboard');

    } catch (error) {
      setLoader(false);
      console.error("Error during signup:", error);
      Toast.fire({
        icon: 'error',
        title: 'Something went wrong. Please try again.',
      });
    }
  };

  const [activeServer, setActiveServer] = useState(null); // stores 'server1', 'server2', 'server3'

  const handleCheckboxChange = (serverId) => {
    setActiveServer(prev => (prev === serverId ? null : serverId)); // toggle if same clicked again
  };

  const checkDetails = () => {
    if (password !== confirmPassword) {
      Toast.fire({
        icon: 'warning',
        title: "Passwords don't match",
      });
      return;
    }
    setShowServerForm(true)
  }

  return (
    <main className='signup-page'>
      {
        showServerForm &&
        <div className='server-form-wrapper'>
          <div className="admin-trader-card-delete-btn-container server-close-btn-container" onClick={() => { setShowServerForm(false) }}>
            <IoMdClose />
          </div>
          <h1>select server</h1>
          <div class="cards">
            <div className="server-card red">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={activeServer === 'server1'}
                  onChange={() => handleCheckboxChange('server1')}
                />
                <span className="slider"></span>
              </label>
              <p className="tip">server 1</p>
            </div>

            <div className="server-card blue">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={activeServer === 'server2'}
                  onChange={() => handleCheckboxChange('server2')}
                />
                <span className="slider"></span>
              </label>
              <p className="tip">server 2</p>
            </div>

            <div className="server-card green">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={activeServer === 'server3'}
                  onChange={() => handleCheckboxChange('server3')}
                />
                <span className="slider"></span>
              </label>
              <p className="tip">server 3</p>
            </div>
          </div>
          <button className='server-form-btn' onClick={(e) => {
            e.preventDefault()
            Signup()
          }}>proceed</button>
        </div>
      }
      {/* <Header /> */}
      {
        loader &&
        <Loader />
      }
      {
        !showServerForm &&
        <div className="login-wrapper">
          <form className="form" onSubmit={(e) => {
            e.preventDefault()
            checkDetails()
          }}>
            <img src="/bellwetherlogo (1).png" alt="" className="signup-logo" onClick={() => {
              navigate('/')
            }} />
            <span class="subtitle">Get started with Bellwethertrades, just create an account and enjoy the experience.</span>
            <div class="input_containers">
              <label class="input_labels" for="email_field">Firstname</label>
              <span className="icont">
                <BiUser />
              </span>
              <input onChange={(e) => {
                setFirstname(e.target.value.trim())
              }} value={firstname} placeholder="john" title="Inpit title" name="input-name" type="text" class="input_field" id="firstname_field" required />
            </div>
            <div class="input_containers">
              <label class="input_labels" for="lastname_field">Lastname</label>
              <span className="icont">
                <BiUser />
              </span>
              <input
                onChange={(e) => {
                  setLastname(e.target.value.trim())
                }} value={lastname}
                placeholder="Doe"
                title="Inpit title"
                name="input-name"
                type="text" className="input_field" id="lastname_field" autocomplete="off" required />
            </div>
            <div class="input_containers">
              <label class="input_labels" for="lastname_field">username</label>
              <span className="icont">
                <GrUserAdmin />
              </span>
              <input onChange={(e) => {
                setUserName(e.target.value.trim())
              }} value={username} placeholder="johnsmith" title="Inpit title" name="input-name" type="text" class="input_field" id="lastname_field" required />
            </div>
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
            <div class="input_containers">
              <label class="input_labels" for="password_field">Password</label>
              <svg fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg" class="icont">
                <path stroke-linecap="round" stroke-width="1.5" stroke="#141B34" d="M18 11.0041C17.4166 9.91704 16.273 9.15775 14.9519 9.0993C13.477 9.03404 11.9788 9 10.329 9C8.67911 9 7.18091 9.03404 5.70604 9.0993C3.95328 9.17685 2.51295 10.4881 2.27882 12.1618C2.12602 13.2541 2 14.3734 2 15.5134C2 16.6534 2.12602 17.7727 2.27882 18.865C2.51295 20.5387 3.95328 21.8499 5.70604 21.9275C6.42013 21.9591 7.26041 21.9834 8 22"></path>
                <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="#141B34" d="M6 9V6.5C6 4.01472 8.01472 2 10.5 2C12.9853 2 15 4.01472 15 6.5V9"></path>
                <path fill="#141B34" d="M21.2046 15.1045L20.6242 15.6956V15.6956L21.2046 15.1045ZM21.4196 16.4767C21.7461 16.7972 22.2706 16.7924 22.5911 16.466C22.9116 16.1395 22.9068 15.615 22.5804 15.2945L21.4196 16.4767ZM18.0228 15.1045L17.4424 14.5134V14.5134L18.0228 15.1045ZM18.2379 18.0387C18.5643 18.3593 19.0888 18.3545 19.4094 18.028C19.7299 17.7016 19.7251 17.1771 19.3987 16.8565L18.2379 18.0387ZM14.2603 20.7619C13.7039 21.3082 12.7957 21.3082 12.2394 20.7619L11.0786 21.9441C12.2794 23.1232 14.2202 23.1232 15.4211 21.9441L14.2603 20.7619ZM12.2394 20.7619C11.6914 20.2239 11.6914 19.358 12.2394 18.82L11.0786 17.6378C9.86927 18.8252 9.86927 20.7567 11.0786 21.9441L12.2394 20.7619ZM12.2394 18.82C12.7957 18.2737 13.7039 18.2737 14.2603 18.82L15.4211 17.6378C14.2202 16.4587 12.2794 16.4587 11.0786 17.6378L12.2394 18.82ZM14.2603 18.82C14.8082 19.358 14.8082 20.2239 14.2603 20.7619L15.4211 21.9441C16.6304 20.7567 16.6304 18.8252 15.4211 17.6378L14.2603 18.82ZM20.6242 15.6956L21.4196 16.4767L22.5804 15.2945L21.785 14.5134L20.6242 15.6956ZM15.4211 18.82L17.8078 16.4767L16.647 15.2944L14.2603 17.6377L15.4211 18.82ZM17.8078 16.4767L18.6032 15.6956L17.4424 14.5134L16.647 15.2945L17.8078 16.4767ZM16.647 16.4767L18.2379 18.0387L19.3987 16.8565L17.8078 15.2945L16.647 16.4767ZM21.785 14.5134C21.4266 14.1616 21.0998 13.8383 20.7993 13.6131C20.4791 13.3732 20.096 13.1716 19.6137 13.1716V14.8284C19.6145 14.8284 19.619 14.8273 19.6395 14.8357C19.6663 14.8466 19.7183 14.8735 19.806 14.9391C19.9969 15.0822 20.2326 15.3112 20.6242 15.6956L21.785 14.5134ZM18.6032 15.6956C18.9948 15.3112 19.2305 15.0822 19.4215 14.9391C19.5091 14.8735 19.5611 14.8466 19.5879 14.8357C19.6084 14.8273 19.6129 14.8284 19.6137 14.8284V13.1716C19.1314 13.1716 18.7483 13.3732 18.4281 13.6131C18.1276 13.8383 17.8008 14.1616 17.4424 14.5134L18.6032 15.6956Z"></path>
              </svg>
              <input onChange={(e) => {
                setPassword(e.target.value.trim())
              }} value={password} placeholder="Password" title="Inpit title" name="input-name" type={`${showPassword ? "text" : "password"}`} class="input_field" id="password_field" required />
              <div className="eye-container" onClick={() => { setShowPassword(!showPassword) }}>
                {
                  showPassword ?
                    <BsEye />
                    :
                    <BsEyeSlash />
                }
              </div>
            </div>
            <div class="input_containers">
              <label class="input_labels" for="confirm_password_field">Confirm Password</label>
              <svg fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg" class="icont">
                <path stroke-linecap="round" stroke-width="1.5" stroke="#141B34" d="M18 11.0041C17.4166 9.91704 16.273 9.15775 14.9519 9.0993C13.477 9.03404 11.9788 9 10.329 9C8.67911 9 7.18091 9.03404 5.70604 9.0993C3.95328 9.17685 2.51295 10.4881 2.27882 12.1618C2.12602 13.2541 2 14.3734 2 15.5134C2 16.6534 2.12602 17.7727 2.27882 18.865C2.51295 20.5387 3.95328 21.8499 5.70604 21.9275C6.42013 21.9591 7.26041 21.9834 8 22"></path>
                <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="#141B34" d="M6 9V6.5C6 4.01472 8.01472 2 10.5 2C12.9853 2 15 4.01472 15 6.5V9"></path>
                <path fill="#141B34" d="M21.2046 15.1045L20.6242 15.6956V15.6956L21.2046 15.1045ZM21.4196 16.4767C21.7461 16.7972 22.2706 16.7924 22.5911 16.466C22.9116 16.1395 22.9068 15.615 22.5804 15.2945L21.4196 16.4767ZM18.0228 15.1045L17.4424 14.5134V14.5134L18.0228 15.1045ZM18.2379 18.0387C18.5643 18.3593 19.0888 18.3545 19.4094 18.028C19.7299 17.7016 19.7251 17.1771 19.3987 16.8565L18.2379 18.0387ZM14.2603 20.7619C13.7039 21.3082 12.7957 21.3082 12.2394 20.7619L11.0786 21.9441C12.2794 23.1232 14.2202 23.1232 15.4211 21.9441L14.2603 20.7619ZM12.2394 20.7619C11.6914 20.2239 11.6914 19.358 12.2394 18.82L11.0786 17.6378C9.86927 18.8252 9.86927 20.7567 11.0786 21.9441L12.2394 20.7619ZM12.2394 18.82C12.7957 18.2737 13.7039 18.2737 14.2603 18.82L15.4211 17.6378C14.2202 16.4587 12.2794 16.4587 11.0786 17.6378L12.2394 18.82ZM14.2603 18.82C14.8082 19.358 14.8082 20.2239 14.2603 20.7619L15.4211 21.9441C16.6304 20.7567 16.6304 18.8252 15.4211 17.6378L14.2603 18.82ZM20.6242 15.6956L21.4196 16.4767L22.5804 15.2945L21.785 14.5134L20.6242 15.6956ZM15.4211 18.82L17.8078 16.4767L16.647 15.2944L14.2603 17.6377L15.4211 18.82ZM17.8078 16.4767L18.6032 15.6956L17.4424 14.5134L16.647 15.2945L17.8078 16.4767ZM16.647 16.4767L18.2379 18.0387L19.3987 16.8565L17.8078 15.2945L16.647 16.4767ZM21.785 14.5134C21.4266 14.1616 21.0998 13.8383 20.7993 13.6131C20.4791 13.3732 20.096 13.1716 19.6137 13.1716V14.8284C19.6145 14.8284 19.619 14.8273 19.6395 14.8357C19.6663 14.8466 19.7183 14.8735 19.806 14.9391C19.9969 15.0822 20.2326 15.3112 20.6242 15.6956L21.785 14.5134ZM18.6032 15.6956C18.9948 15.3112 19.2305 15.0822 19.4215 14.9391C19.5091 14.8735 19.5611 14.8466 19.5879 14.8357C19.6084 14.8273 19.6129 14.8284 19.6137 14.8284V13.1716C19.1314 13.1716 18.7483 13.3732 18.4281 13.6131C18.1276 13.8383 17.8008 14.1616 17.4424 14.5134L18.6032 15.6956Z"></path>
              </svg>
              <input onChange={(e) => {
                setConfirmPassword(e.target.value.trim())
              }} value={confirmPassword} placeholder="Confirm Password" title="Inpit title" name="input-name" type={`${showConfirmPassword ? "text" : "password"}`} class="input_field" id="confirm_password_field" required />
              <div className="eye-container" onClick={() => { setShowConfirmPassword(!showConfirmPassword) }}>
                {
                  showConfirmPassword ?
                    <BsEye />
                    :
                    <BsEyeSlash />
                }
              </div>
            </div>
            <span class="sub">Already have an account ? <Link to="/login">Sign in</Link></span>
            <button type='submit'>Register</button>
          </form>
        </div>}
    </main>
  )
}

export default Signup




