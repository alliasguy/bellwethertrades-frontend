import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './profile.css';
import Userdashboardheader from '../userdashboardheader/Userdashboardheader';
import { BsImage } from 'react-icons/bs';
import { RxUpload } from 'react-icons/rx';
import Swal from 'sweetalert2';
import { IoMdNotifications } from "react-icons/io";
import { FaUserAlt, FaAngleDown } from "react-icons/fa";
import MobileDropdown from '../MobileDropdown';

const Profile = ({ route }) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [country, setCountry] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [state, setState] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [userData, setUserData] = useState(null);
  const [showImage, setShowImage] = useState();
  const [showMobileDropdown,setShowMobileDropdown] = useState(false)

  const navigate = useNavigate();
  
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const getData = async () => {
        const req = await fetch(`${route}/api/getData`, {
          headers: { 'x-access-token': localStorage.getItem('token') }
        });
        const res = await req.json();
        setUserData(res);
        setFirstname(res.firstname);
        setLastname(res.lastname);
        setCountry(res.country);
        setZipCode(res.zipcode);
        setState(res.state);
        setPhone(res.phonenumber);
        setAddress(res.address);
      };
      getData();
    } else {
      navigate('/login');
    }
  }, [route, navigate]);

  const uploadProof = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'upload');
    
    const req = await fetch('https://api.cloudinary.com/v1_1/duesyx3zu/image/upload', {
      method: 'POST',
      body: formData,
    });
    const res = await req.json();
    if (res) {
      setShowImage(res.secure_url);
    }
  };

  const updateUserData = async () => {
    const req = await fetch(`${route}/api/updateUserData`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      body: JSON.stringify({
        firstname,
        lastname,
        country,
        state,
        phonenumber: phone,
        zipcode: zipCode,
        profilepicture: showImage,
        address
      })
    });

    const res = await req.json();
    if (res.status === 200) {
      Toast.fire({ icon: 'success', title: `Profile successfully updated` });
    } else if (res.status === 400) {
      Toast.fire({ icon: 'warning', title: `No changes were made` });
    } else {
      Toast.fire({ icon: 'error', title: `Internal server error` });
    }
  };

  const closeMobileMenu = () => {
    setShowMobileDropdown(false)
  }

  return (
    <div className='homewrapper'>
      <Userdashboardheader route={route} />
      <section className='dashboardhomepage'>
        <div className="dashboardheaderwrapper">
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
                
            </div>
          </div>
        </div>
      
        <div className="profile-page">
          <MobileDropdown showStatus={showMobileDropdown} route={route} closeMenu={closeMobileMenu} />
        <div className="page-header">
          <h2>Profile Settings</h2>
          <p>Choose an investment plan to start earning immediately</p>
        </div>
        <div className="profile-form-container">
          <form className="profile-form" onSubmit={(e) => { e.preventDefault(); updateUserData(); }}>
            <div className="upper-chamber">
              <div className="profile-picture-upload-container">
                <div className="profile-circle">
                  {showImage ? <img src={showImage} alt="" className='profile-circle-img' /> : <BsImage />}
                </div>
                <label htmlFor="file-input" className='upload-icon'>
                  <RxUpload />
                  <input type="file" accept=".jpg, .png, .svg, .webp, .jpeg" id="file-input" className='proof-input' required onChange={(e) => uploadProof(e.target.files[0])} />
                </label>
              </div>
              <div className="first-input-container">
                <div className="profile-input-container">
                  <label htmlFor="firstname">First Name</label>
                  <input type="text" id="firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                </div>
                <div className="profile-input-container">
                  <label htmlFor="lastname">Last Name</label>
                  <input type="text" id="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                </div>
                <div className="profile-input-container">
                  <label htmlFor="email">Email</label>
                  <input type="text" id="email" value={userData ? userData.email : ''} readOnly />
                </div>
                <div className="profile-input-container">
                  <label htmlFor="phone">Phone Number</label>
                  <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="lower-chamber">
              <div className="profile-input-container">
                <label htmlFor="country">Country</label>
                <input type="text" id="country" value={country} onChange={(e) => setCountry(e.target.value)} />
              </div>
              <div className="profile-input-container">
                <label htmlFor="address">Address</label>
                <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>
              <div className="profile-input-container">
                <label htmlFor="state">State</label>
                <input type="text" id="state" value={state} onChange={(e) => setState(e.target.value)} />
              </div>
              <div className="profile-input-container">
                <label htmlFor="zipCode">Zip Code</label>
                <input type="text" id="zipCode" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
              </div>
            </div>
            <input type="submit" value="Update" className='update-profile-btn' />
          </form>
        </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
