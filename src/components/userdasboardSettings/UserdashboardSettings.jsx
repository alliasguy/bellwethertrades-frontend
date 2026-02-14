import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Userdashboardheader from '../userdashboardheader/Userdashboardheader';
import Loader from '../Loader';
import MobileDropdown from '../MobileDropdown';
import { FaUserAlt, FaAngleDown, FaCamera } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import './userdashboardsettings.css';

const UserdashboardSettings = ({ route }) => {
  const [userData, setUserData] = useState(null);
  const [loader, setLoader] = useState(false);
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const navigate = useNavigate();

  // Password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoader(true);
        const token = localStorage.getItem('token');

        if (!token) {
          navigate('/login');
          return;
        }

        const response = await fetch(`${route}/api/getData`, {
          headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (data.status === 'error') {
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          setUserData(data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/login');
      } finally {
        setLoader(false);
      }
    };

    getData();
  }, [navigate, route]);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const uploadProfilePicture = async (file) => {
    setUploadingImage(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'upload');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/duesyx3zu/image/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (data.secure_url) {
        // Update user profile picture
        const token = localStorage.getItem('token');
        const updateResponse = await fetch(`${route}/api/updateUserData`, {
          method: 'POST',
          headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ profilepicture: data.secure_url }),
        });

        const updateData = await updateResponse.json();

        if (updateData.status === 200) {
          setUserData({ ...userData, profilepicture: data.secure_url });
          Swal.fire('Success', 'Profile picture updated successfully', 'success');
        } else {
          Swal.fire('Error', 'Failed to update profile picture', 'error');
        }
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to upload image', 'error');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire('Error', 'Image size should be less than 5MB', 'error');
        return;
      }
      uploadProfilePicture(file);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      Swal.fire('Error', 'New passwords do not match', 'error');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      Swal.fire('Error', 'Password must be at least 6 characters long', 'error');
      return;
    }

    if (passwordData.currentPassword !== userData.password) {
      Swal.fire('Error', 'Current password is incorrect', 'error');
      return;
    }

    setLoader(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${route}/api/updateUserData`, {
        method: 'POST',
        headers: {
          'x-access-token': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: passwordData.newPassword }),
      });

      const data = await response.json();

      if (data.status === 200) {
        Swal.fire('Success', 'Password updated successfully', 'success');
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        // Refresh user data
        window.location.reload();
      } else {
        Swal.fire('Error', data.message || 'Failed to update password', 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'An error occurred while updating password', 'error');
    } finally {
      setLoader(false);
    }
  };

  const closeMobileMenu = () => {
    setShowMobileDropdown(false);
  };

  return (
    <main className='homewrapper'>
      {loader && <Loader />}
      <Userdashboardheader />
    
      <section className='dashboardhomepage settings-page'>
        <div className="dashboardheaderwrapper">
          <div className="header-notification-icon-container">
            <IoMdNotifications />
          </div>
          <div className="header-username-container">
            <h3>Hi, {userData ? userData.firstname : ''}</h3>
          </div>
          <div className="header-userprofile-container">
            <div className="user-p-icon-container">
              <FaUserAlt />
            </div>
            <div className="user-p-drop-icon" onClick={() => setShowMobileDropdown(!showMobileDropdown)}>
              <FaAngleDown />
            </div>
            
          </div>
        </div>

        <div className="settings-container">
          <MobileDropdown showStatus={showMobileDropdown} route={route} closeMenu={closeMobileMenu} />
          <div className="settings-header">
            <h2>Account Settings</h2>
            <p>Manage your profile picture and password</p>
          </div>

          {/* Profile Picture Section */}
          <div className="settings-card">
              
            <h3>Profile Picture</h3>
            <div className="profile-picture-section">
              <div className="profile-picture-display">
                {userData?.profilepicture ? (
                  <img src={userData.profilepicture} alt="Profile" className="profile-img" />
                ) : (
                  <div className="profile-placeholder">
                    <FaUserAlt />
                  </div>
                )}
                <label htmlFor="profile-upload" className="profile-upload-btn">
                  <FaCamera />
                  <input
                    type="file"
                    id="profile-upload"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={uploadingImage}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
              <div className="profile-info">
                <h4>{userData?.firstname} {userData?.lastname}</h4>
                <p>{userData?.email}</p>
                <small>Click the camera icon to upload a new picture (Max 5MB)</small>
              </div>
            </div>
          </div>

          {/* Password Reset Section */}
          <div className="settings-card">
            
            <h3>Change Password</h3>
            <form className="password-form" onSubmit={handlePasswordSubmit}>
              
              <div className="form-group">
                
                <label>Current Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    required
                    placeholder="Enter current password"
                  />
                  <div className="password-toggle" onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                    {showCurrentPassword ? <BsEye /> : <BsEyeSlash />}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>New Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    required
                    placeholder="Enter new password"
                    minLength="6"
                  />
                  <div className="password-toggle" onClick={() => setShowNewPassword(!showNewPassword)}>
                    {showNewPassword ? <BsEye /> : <BsEyeSlash />}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Confirm New Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                    placeholder="Confirm new password"
                    minLength="6"
                  />
                  <div className="password-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <BsEye /> : <BsEyeSlash />}
                  </div>
                </div>
              </div>

              <button type="submit" className="btn-update-password">
                Update Password
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default UserdashboardSettings;