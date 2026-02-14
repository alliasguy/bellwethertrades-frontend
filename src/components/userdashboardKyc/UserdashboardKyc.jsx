import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Userdashboardheader from '../userdashboardheader/Userdashboardheader';
import Loader from '../Loader';
import MobileDropdown from '../MobileDropdown';
import { FaUserAlt, FaAngleDown, FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import './userdashboardkyc.css';

const UserdashboardKyc = ({ route }) => {
  const [userData, setUserData] = useState(null);
  const [loader, setLoader] = useState(false);
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadingDoc, setUploadingDoc] = useState(false);

  const [formData, setFormData] = useState({
    // Personal Information
    middlename: '',
    dateOfBirth: '',
    nationality: '',
    city: '',
    address: '',
    // Financial Information
    employmentStatus: '',
    occupation: '',
    annualIncome: '',
    sourceOfFunds: '',
    investmentExperience: '',
    // Identity Verification
    idType: '',
    idNumber: '',
    idExpiry: '',
    idDocumentFront: '',
    idDocumentBack: '',
    proofOfAddress: '',
    selfiePhoto: ''
  });

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
          // Pre-fill form with existing KYC data if any
          if (data.kycStatus !== 'not_submitted') {
            setFormData({
              middlename: data.middlename || '',
              dateOfBirth: data.dateOfBirth || '',
              nationality: data.nationality || '',
              city: data.city || '',
              address: data.address || '',
              employmentStatus: data.employmentStatus || '',
              occupation: data.occupation || '',
              annualIncome: data.annualIncome || '',
              sourceOfFunds: data.sourceOfFunds || '',
              investmentExperience: data.investmentExperience || '',
              idType: data.idType || '',
              idNumber: data.idNumber || '',
              idExpiry: data.idExpiry || '',
              idDocumentFront: data.idDocumentFront || '',
              idDocumentBack: data.idDocumentBack || '',
              proofOfAddress: data.proofOfAddress || '',
              selfiePhoto: data.selfiePhoto || ''
            });
          }
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const uploadDocument = async (file, fieldName) => {
    setUploadingDoc(true);
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);
    formDataUpload.append('upload_preset', 'upload');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/duesyx3zu/image/upload', {
        method: 'POST',
        body: formDataUpload,
      });
      const data = await response.json();

      if (data.secure_url) {
        setFormData(prev => ({ ...prev, [fieldName]: data.secure_url }));
        Swal.fire('Success', 'Document uploaded successfully', 'success');
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to upload document', 'error');
    } finally {
      setUploadingDoc(false);
    }
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      uploadDocument(file, fieldName);
    }
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.middlename && formData.dateOfBirth && formData.nationality && formData.city;
      case 2:
        return formData.employmentStatus && formData.occupation && formData.annualIncome &&
          formData.sourceOfFunds && formData.investmentExperience;
      case 3:
        return formData.idType && formData.idNumber && formData.idExpiry &&
          formData.idDocumentFront && formData.idDocumentBack &&
          formData.proofOfAddress && formData.selfiePhoto;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (!validateStep(currentStep)) {
      Swal.fire('Incomplete', 'Please fill all required fields before proceeding', 'warning');
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(3)) {
      Swal.fire('Incomplete Form', 'Please complete all steps and upload all required documents', 'warning');
      return;
    }

    setLoader(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${route}/api/submitKYC`, {
        method: 'POST',
        headers: {
          'x-access-token': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.status === 'ok') {
        Swal.fire(
          'KYC Submitted!',
          'Your KYC documents have been successfully submitted and are under review.',
          'success'
        );
        // Refresh user data to update status
        window.location.reload();
      } else {
        Swal.fire('Error', data.message || 'Failed to submit KYC', 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'An error occurred while submitting KYC', 'error');
    } finally {
      setLoader(false);
    }
  };

  const getStatusBadge = () => {
    if (!userData) return null;

    const statusConfig = {
      not_submitted: { icon: <FaClock />, text: 'Not Submitted', class: 'status-not-submitted' },
      processing: { icon: <FaClock />, text: 'Under Review', class: 'status-processing' },
      approved: { icon: <FaCheckCircle />, text: 'Approved', class: 'status-approved' },
      rejected: { icon: <FaTimesCircle />, text: 'Rejected', class: 'status-rejected' }
    };

    const status = statusConfig[userData.kycStatus] || statusConfig.not_submitted;

    return (
      <div className={`kyc-status-banner ${status.class}`}>
        <div className="status-icon">{status.icon}</div>
        <div className="status-content">
          <h3>KYC Status: {status.text}</h3>
          {userData.kycStatus === 'processing' && (
            <p>Your documents are being reviewed. This usually takes 24-48 hours.</p>
          )}
          {userData.kycStatus === 'approved' && (
            <p>Your account has been verified. You have full access to all features.</p>
          )}
          {userData.kycStatus === 'rejected' && (
            <p>Reason: {userData.kycRejectionReason || 'Please resubmit with correct documents.'}</p>
          )}
          {userData.kycStatus === 'not_submitted' && (
            <p>Complete your KYC verification to unlock all platform features.</p>
          )}
        </div>
      </div>
    );
  };

  const closeMobileMenu = () => {
    setShowMobileDropdown(false);
  };

  // Don't allow editing if approved
  const isFormDisabled = userData?.kycStatus === 'approved' || userData?.kycStatus === 'processing';

  return (
    <main className='homewrapper'>
      {loader && <Loader />}
      <Userdashboardheader />
      <section className='dashboardhomepage kyc-page'>
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

        {getStatusBadge()}

        {!isFormDisabled && (
          <div className="kyc-form-container">
            <MobileDropdown showStatus={showMobileDropdown} route={route} closeMenu={closeMobileMenu} />
            <div className="kyc-form-header">
              <h2>KYC Verification</h2>
              <p>Complete all steps to verify your identity</p>
            </div>

            {/* Progress Indicator */}
            <div className="progress-indicator">
              <div className={`progress-step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
                <div className="step-number">1</div>
                <div className="step-label">Personal Info</div>
              </div>
              <div className={`progress-line ${currentStep > 1 ? 'completed' : ''}`}></div>
              <div className={`progress-step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
                <div className="step-number">2</div>
                <div className="step-label">Financial Info</div>
              </div>
              <div className={`progress-line ${currentStep > 2 ? 'completed' : ''}`}></div>
              <div className={`progress-step ${currentStep >= 3 ? 'active' : ''}`}>
                <div className="step-number">3</div>
                <div className="step-label">Documents</div>
              </div>
            </div>

            <form className="kyc-form" onSubmit={handleSubmit}>
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="form-step">
                  <h3>Personal Information</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>First Name</label>
                      <input type="text" value={userData?.firstname || ''} disabled />
                    </div>
                    <div className="form-group">
                      <label>Middle Name</label>
                      <input type="text" name="middlename" value={formData.middlename} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input type="text" value={userData?.lastname || ''} disabled />
                    </div>
                    <div className="form-group">
                      <label>Date of Birth</label>
                      <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                      <label>Nationality</label>
                      <input type="text" name="nationality" value={formData.nationality} onChange={handleChange} required placeholder="e.g., American, British" />
                    </div>
                    <div className="form-group">
                      <label>City</label>
                      <input type="text" name="city" value={formData.city} onChange={handleChange} required />
                    </div>
                    <div className="form-group full-width">
                      <label>Address</label>
                      <input type="text" name="address" value={formData.address} onChange={handleChange} required placeholder="Enter your full address" />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Financial Information */}
              {currentStep === 2 && (
                <div className="form-step">
                  <h3>Financial Information</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Employment Status</label>
                      <select name="employmentStatus" value={formData.employmentStatus} onChange={handleChange} required>
                        <option value="">Select Status</option>
                        <option value="employed">Employed</option>
                        <option value="self-employed">Self-Employed</option>
                        <option value="unemployed">Unemployed</option>
                        <option value="retired">Retired</option>
                        <option value="student">Student</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Occupation</label>
                      <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} required placeholder="e.g., Software Engineer" />
                    </div>
                    <div className="form-group">
                      <label>Annual Income</label>
                      <select name="annualIncome" value={formData.annualIncome} onChange={handleChange} required>
                        <option value="">Select Range</option>
                        <option value="0-25000">$0 - $25,000</option>
                        <option value="25000-50000">$25,000 - $50,000</option>
                        <option value="50000-100000">$50,000 - $100,000</option>
                        <option value="100000-250000">$100,000 - $250,000</option>
                        <option value="250000+">$250,000+</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Source of Funds</label>
                      <select name="sourceOfFunds" value={formData.sourceOfFunds} onChange={handleChange} required>
                        <option value="">Select Source</option>
                        <option value="salary">Salary/Wages</option>
                        <option value="business">Business Income</option>
                        <option value="investment">Investment Returns</option>
                        <option value="inheritance">Inheritance</option>
                        <option value="savings">Savings</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="form-group full-width">
                      <label>Investment Experience</label>
                      <select name="investmentExperience" value={formData.investmentExperience} onChange={handleChange} required>
                        <option value="">Select Experience Level</option>
                        <option value="beginner">Beginner (0-1 years)</option>
                        <option value="intermediate">Intermediate (1-5 years)</option>
                        <option value="advanced">Advanced (5+ years)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Document Upload */}
              {currentStep === 3 && (
                <div className="form-step">
                  <h3>Identity Verification</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>ID Document Type</label>
                      <select name="idType" value={formData.idType} onChange={handleChange} required>
                        <option value="">Select Type</option>
                        <option value="passport">Passport</option>
                        <option value="drivers_license">Driver's License</option>
                        <option value="national_id">National ID Card</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>ID Number</label>
                      <input type="text" name="idNumber" value={formData.idNumber} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                      <label>ID Expiry Date</label>
                      <input type="date" name="idExpiry" value={formData.idExpiry} onChange={handleChange} required />
                    </div>
                  </div>

                  <div className="document-upload-section">
                    <h4>Upload Documents</h4>
                    <div className="upload-grid">
                      <div className="upload-item">
                        <label>ID Document (Front)</label>
                        <input type="file" accept="image/*,.pdf" onChange={(e) => handleFileChange(e, 'idDocumentFront')} required={!formData.idDocumentFront} />
                        {formData.idDocumentFront && <div className="upload-success">✓ Uploaded</div>}
                      </div>
                      <div className="upload-item">
                        <label>ID Document (Back)</label>
                        <input type="file" accept="image/*,.pdf" onChange={(e) => handleFileChange(e, 'idDocumentBack')} required={!formData.idDocumentBack} />
                        {formData.idDocumentBack && <div className="upload-success">✓ Uploaded</div>}
                      </div>
                      <div className="upload-item">
                        <label>Proof of Address</label>
                        <input type="file" accept="image/*,.pdf" onChange={(e) => handleFileChange(e, 'proofOfAddress')} required={!formData.proofOfAddress} />
                        {formData.proofOfAddress && <div className="upload-success">✓ Uploaded</div>}
                        <small>Utility bill or bank statement (not older than 3 months)</small>
                      </div>
                      <div className="upload-item">
                        <label>Selfie Photo</label>
                        <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'selfiePhoto')} required={!formData.selfiePhoto} />
                        {formData.selfiePhoto && <div className="upload-success">✓ Uploaded</div>}
                        <small>Clear photo of your face</small>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="form-navigation">
                {currentStep > 1 && (
                  <button type="button" className="btn-secondary" onClick={prevStep}>
                    Previous
                  </button>
                )}
                {currentStep < 3 ? (
                  <button type="button" className="btn-primary" onClick={nextStep}>
                    Next
                  </button>
                ) : (
                  <button type="submit" className="btn-submit" disabled={uploadingDoc}>
                    {uploadingDoc ? 'Uploading...' : 'Submit KYC'}
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {isFormDisabled && userData?.kycStatus !== 'approved' && (
          <div className="kyc-disabled-message">
            <p>Your KYC submission is currently under review. You cannot make changes at this time.</p>
          </div>
        )}
      </section>
    </main>
  );
};

export default UserdashboardKyc;