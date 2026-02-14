import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './profile.css';
import Userdashboardheader from '../userdashboardheader/Userdashboardheader';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { FaUserAlt, FaAngleDown, FaCamera, FaLock } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import Swal from 'sweetalert2';
import Loader from '../Loader';
import MobileDropdown from '../MobileDropdown';

const Profile = ({ route }) => {
  const [userData, setUserData] = useState(null);
  const [loader, setLoader] = useState(false);
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

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
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire('Error', 'Image size should be less than 5MB', 'error');
        return;
      }
      uploadProfilePicture(file);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      Swal.fire('Error', 'New passwords do not match', 'error');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      Swal.fire('Error', 'Password must be at least 6 characters long', 'error');
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
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
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
    <div className='homewrapper'>
      <Userdashboardheader route={route} />
      <section className='dashboardhomepage settings-page'>
        {loader && <Loader />}

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

        <div className="settings-container-minimal">
          <MobileDropdown showStatus={showMobileDropdown} route={route} closeMenu={closeMobileMenu} />

          <div className="settings-header-minimal" data-aos="fade-up">
            <h2>Account Settings</h2>
            <p>Manage your professional identity and security settings</p>
          </div>

          <div className="settings-content-grid">
            {/* Profile Picture Card */}
            <div className="settings-card-minimal profile-card" data-aos="fade-up" data-aos-delay="100">
              <div className="card-header-minimal">
                <h3>Profile Identity</h3>
              </div>
              <div className="profile-upload-minimal">
                <div className="profile-preview-wrapper">
                  {userData?.profilepicture ? (
                    <img src={userData.profilepicture} alt="Profile" />
                  ) : (
                    <div className="profile-initials">
                      {userData?.firstname?.charAt(0)}
                    </div>
                  )}
                  <label htmlFor="p-upload" className="camera-btn">
                    <FaCamera />
                    <input type="file" id="p-upload" accept="image/*" onChange={handleFileChange} disabled={uploadingImage} />
                  </label>
                </div>
                <div className="profile-data-minimal">
                  <h4>{userData?.firstname} {userData?.lastname}</h4>
                  <p>{userData?.email}</p>
                  <span className="account-badge">Verified Account</span>
                </div>
              </div>
            </div>

            {/* Password Management Card */}
            <div className="settings-card-minimal security-card" data-aos="fade-up" data-aos-delay="200">
              <div className="card-header-minimal">
                <h3><FaLock /> Security & Password</h3>
              </div>
              <form className="minimal-form" onSubmit={handlePasswordSubmit}>
                <div className="form-item-minimal">
                  <label>Current Password</label>
                  <div className="input-wrapper-minimal">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      placeholder="••••••••"
                      required
                    />
                    <button type="button" className="toggle-eye" onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                      {showCurrentPassword ? <BsEye /> : <BsEyeSlash />}
                    </button>
                  </div>
                </div>

                <div className="form-item-minimal">
                  <label>New Password</label>
                  <div className="input-wrapper-minimal">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      placeholder="Min. 6 characters"
                      required
                    />
                    <button type="button" className="toggle-eye" onClick={() => setShowNewPassword(!showNewPassword)}>
                      {showNewPassword ? <BsEye /> : <BsEyeSlash />}
                    </button>
                  </div>
                </div>

                <div className="form-item-minimal">
                  <label>Confirm New Password</label>
                  <div className="input-wrapper-minimal">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      placeholder="Repeat new password"
                      required
                    />
                    <button type="button" className="toggle-eye" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                      {showConfirmPassword ? <BsEye /> : <BsEyeSlash />}
                    </button>
                  </div>
                </div>

                <button type="submit" className="submit-btn-minimal">
                  Update Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
