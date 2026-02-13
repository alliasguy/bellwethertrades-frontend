import React from 'react'
import { useState, useEffect, useRef } from 'react'
import Userdashboardheader from '../userdashboardheader/Userdashboardheader'
import Loader from '../Loader'
import Swal from 'sweetalert2';
import './userdashboardkyc.css'; 
import { FaUserAlt, FaAngleDown } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import MobileDropdown from '../MobileDropdown'

const UserdashboardKyc = ({route}) => {
  const [userData, setUserData] = useState()
  const [loader, setLoader] = useState(false)
  const [showMobileDropdown,setShowMobileDropdown] = useState(false)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    state: '',
    postalCode: '',
    address: '',
    document: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'document') {
      setFormData({ ...formData, document: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      firstName,
      lastName,
      email,
      country,
      state,
      postalCode,
      address,
      document,
    } = formData;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !country ||
      !state ||
      !postalCode ||
      !address ||
      !document
    ) {
      return Swal.fire('Incomplete Form', 'Please fill all fields and upload a document.', 'warning');
    }

    Swal.fire(
      'KYC Submitted!',
      'Your KYC documents have been successfully submitted and are under review.',
      'success'
    );

    e.target.reset();
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      country: '',
      state: '',
      postalCode: '',
      address: '',
      document: null,
    });
  };
  useEffect(() => {
    const getData = async () => {
      try {
        setLoader(true);
  
        // Check if a token exists
          const token = localStorage.getItem('token');
          console.log(token)
        if (!token) {
          navigate('/login');
          return;
        }
  
        // Fetch user data from the API
        const response = await fetch(`${route}/api/getData`, {
          headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
          },
        });
  
        // Parse the response
        const data = await response.json();
  
        // Handle errors from the API
        if (data.status === 'error') {
          localStorage.removeItem('token'); // Clear invalid token
          navigate('/login');
        } else {
          setUserData(data); // Set user data
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/login'); // Navigate to login on failure
      } finally {
        setLoader(false); // Stop loader
      }
    };
  
    getData();
  }, [navigate, route]);
  
  const closeMobileMenu = () => {
    setShowMobileDropdown(false)
  }
  return (
    <main className='homewrapper'>
         {
           loader &&
             <Loader />
         }
       <Userdashboardheader />
         <section className='dashboardhomepage'>
           
          <div className="dashboardheaderwrapper">
            <div className="header-notification-icon-container">
                          <IoMdNotifications />
                      </div>
                      <div className="header-username-container">
                        <h3>Hi, {userData ? userData.firstname : ''}</h3>
                      </div>
                      <div className="header-userprofile-container">
                        <div className="user-p-icon-container">
                          <FaUserAlt/>
                        </div>
                        <div className="user-p-drop-icon" onClick={() => { setShowMobileDropdown(!showMobileDropdown); }
                          }>
                            <FaAngleDown />
                          </div>
                          <MobileDropdown showStatus={showMobileDropdown} route={route} closeMenu={closeMobileMenu} />
                      </div>
        </div>
        <form className="kyc-form" onSubmit={handleSubmit}>
            <h2>KYC Submission</h2>

            <label>First Name</label>
            <input type="text" name="firstName" onChange={handleChange} required />

            <label>Last Name</label>
            <input type="text" name="lastName" onChange={handleChange} required />

            <label>Email</label>
            <input type="email" name="email" onChange={handleChange} required />

            <label>Country</label>
            <input type="text" name="country" onChange={handleChange} required />

            <label>State</label>
            <input type="text" name="state" onChange={handleChange} required />

            <label>Postal Code</label>
            <input type="text" name="postalCode" onChange={handleChange} required />

            <label>Address</label>
            <input type="text" name="address" onChange={handleChange} required />

            <label>Upload Document</label>
            <input type="file" name="document" accept=".pdf,.jpg,.jpeg,.png" onChange={handleChange} required />

            <button type="submit">Submit KYC</button>
          </form>
          </section>
        </main>  
  )
}

export default UserdashboardKyc