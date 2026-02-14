import React from 'react'
import './admindashboard.css'
import Swal from 'sweetalert2'
import axios from "axios";
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Loader from '../Loader'
import { IoMdNotifications } from "react-icons/io";
import { FaUserAlt, FaAngleDown, FaEllipsisH } from "react-icons/fa";
import { MdClose } from 'react-icons/md'
import AdminHeader from '../AdminHeader'
import { RxUpload } from 'react-icons/rx'
import { MdCandlestickChart, MdOutlineShowChart, MdDeleteSweep } from 'react-icons/md'
import { BsImage } from 'react-icons/bs'
import { FiLogOut } from 'react-icons/fi'
import { GiReceiveMoney } from 'react-icons/gi'
import { RxDashboard } from 'react-icons/rx'
import { AiOutlineClose } from 'react-icons/ai'
const Admindashboard = ({ route }) => {

  const fetchTraders = async () => {
    const req = await fetch(`${route}/api/fetchTraders`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const res = await req.json()
    setLoader(false)
    if (res.status === 200) {
      setTraders(res.traders)

    }
    else {
      setTraders([])
    }
  }

  const fetchUsers = async () => {
    const req = await fetch(`${route}/api/getUsers`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const res = await req.json()

    setLoader(false)
    if (res) {
      setUsers(res)
    }
    else {
      setUsers([])
    }
  }

  useEffect(() => {
    setLoader(true)
    fetchUsers()
    fetchTraders()
  }, [])

  // sweet alert function 
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

  const creditUser = async () => {
    setLoader(true)
    const req = await fetch(`${route}/api/fundwallet`,
      {
        method: 'POST',
        headers: {
          'content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: userAmount, email: email
        })
      })

    const res = await req.json()
    setLoader(false)
    if (res.status === 'ok') {
      Toast.fire({
        icon: 'success',
        title: `Acoount credited with  $${res.funded} USD`
      })
      const data = {
        service_id: 'service_y5q5bg4',
        template_id: 'template_afzn8vh',
        user_id: '7GqjR4AnJaLOlwQj6',
        template_params: {
          'name': `${res.name}`,
          'email': `${res.email}`,
          'message': `${res.message}`,
          'reply_to': `support@bellwethertrades.org`,
          'subject': `${res.subject}`
        }
      };

      if (res.upline === null) {
        await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
        })
      }
      else {
        const uplineData = {
          service_id: 'service_y5q5bg4',
          template_id: 'template_afzn8vh',
          user_id: '7GqjR4AnJaLOlwQj6',
          template_params: {
            'name': `${res.uplineName}`,
            'email': `${res.uplineEmail}`,
            'message': `${res.uplineMessage}`,
            'reply_to': `support@bellwethertrades.org`,
            'subject': `${res.uplineSubject}`
          }
        };

        await Promise.all([
          await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
          }),
          await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(uplineData),
          })
        ])
      }

      setEmail('')
      setUserAmount('')
      fetchUsers()
    }
    else {
      Toast.fire({
        icon: 'error',
        title: `sorry, something went wrong ${res.error} `
      })
    }
  }

  const debitUser = async () => {
    setLoader(true)
    const req = await fetch(`${route}/api/debitwallet`,
      {
        method: 'POST',
        headers: {
          'content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: userAmount, email: email
        })
      })

    const res = await req.json()
    setLoader(false)
    if (res.status === 'ok') {
      Toast.fire({
        icon: 'success',
        title: `Acoount debited with  $${res.funded} USD`
      })
      const data = {
        service_id: 'service_y5q5bg4',
        template_id: 'template_afzn8vh',
        user_id: '7GqjR4AnJaLOlwQj6',
        template_params: {
          'name': `${res.name}`,
          'email': `${res.email}`,
          'message': `${res.message}`,
          'reply_to': `support@bellwethertrades.org`,
          'subject': `${res.subject}`
        }
      };


      await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      })
      setEmail('')
      setUserAmount('')
      fetchUsers()
    }
    else {
      Toast.fire({
        icon: 'error',
        title: `amount ${res.funded}, is more than users capital, something went wrong ${res.error} `
      })
    }
  }

  const [name, setName] = useState('')

  const approveWithdraw = async () => {
    const userDetails = await fetch(`${route}/api/getWithdrawInfo`, {
      method: 'POST',
      headers: {
        'content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: activeEmail
      })
    })
    const awaitedData = await userDetails.json()
    console.log(awaitedData.amount)


    if (awaitedData.amount !== undefined) {
      const data = {
        service_id: 'service_y5q5bg4',
        template_id: 'template_afzn8vh',
        user_id: '7GqjR4AnJaLOlwQj6',
        template_params: {
          'name': `${name}`,
          'email': `${activeEmail}`,
          'message': `Congratulations! your withdrawal $${awaitedData.amount} has been approved. confirm withdrawal of $${awaitedData.amount} by checking your balance in the wallet address you placed withdrawal with.`,
          'reply_to': `support@bellwethertrades.org`,
          'subject': `successful withdrawal`
        }
      };

      Toast.fire({
        icon: 'success',
        title: `approval email sent`
      })

      await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      })
    }
    else {
      Toast.fire({
        icon: 'error',
        title: `user hasn't made any withdrawal yet`
      })
    }
  }

  const navigate = useNavigate()
  const [showDeleteModal, setShowDeletModal] = useState()
  const [activeEmail, setActiveEmail] = useState('')
  const [showUpgradeModal, setShowUpgradeModal] = useState()
  const [showForm, SetShowFoarm] = useState(true)
  const [showDashboard, setShowDasboard] = useState(false)
  const [users, setUsers] = useState()
  const [loader, setLoader] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [userAmount, setUserAmount] = useState()
  const [showModal, setShowModal] = useState(false)
  const [showCreateTrader, setShowCreateTrader] = useState(false)
  const [showTraderLogs, setShowTraderLogs] = useState(false)
  const [showUsers, setShowUsers] = useState(true)
  const [showImage, setShowImage] = useState();
  const [traders, setTraders] = useState([])
  const [activeTrader, setActiveTrader] = useState({

  })
  const [showTraderLogForm, setShowTraderLogForm] = useState(false)
  const [activeTraderId, setActiveTraderId] = useState()
  const [selectedValue, setSelectedValue] = useState()
  const [showStatus, setShowStatus] = useState(false)
  const [debitModal, setDebitModal] = useState(false)

  // New state for individual allocations
  const [copyTraders, setCopyTraders] = useState([])
  const [individualAllocations, setIndividualAllocations] = useState({})

  // User Management UI State
  const [activeActionMenu, setActiveActionMenu] = useState(null)
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => {
    const handleClickOutside = () => setActiveActionMenu(null);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  // Bulk Action State
  const [bulkAmount, setBulkAmount] = useState('')
  const [bulkType, setBulkType] = useState('profit')

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const closeMenu = () => {
    setShowStatus(false)
  }

  const openCreateTrader = () => {
    setShowCreateTrader(true)
    setShowTraderLogs(false)
    setShowUsers(false)
  }
  const openTraderLogs = () => {
    setShowTraderLogs(true)
    setShowUsers(false)
    setShowCreateTrader(false)
  }

  const openUsers = () => {
    setShowCreateTrader(false)
    setShowTraderLogs(false)
    setShowUsers(true)
  }


  const upgradeUser = async () => {

    setLoader(true)
    const req = await fetch(`${route}/api/upgradeUser`,
      {
        method: 'POST',
        headers: {
          'content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: userAmount, email: activeEmail
        })
      })
    const res = await req.json()
    setLoader(false)
    if (res.status === 'ok') {
      Toast.fire({
        icon: 'success',
        title: `Acoount upgraded by  $${res.funded} USD in profit`
      })
      setShowUpgradeModal(false)
      fetchUsers()
    } else {
      Toast.fire({
        icon: 'error',
        title: `something went wrong`
      })
    }

  }

  const applyBulkAllocation = () => {
    if (!copyTraders || copyTraders.length === 0) return;

    const newAllocations = {};
    copyTraders.forEach(user => {
      newAllocations[user._id] = {
        amount: parseFloat(bulkAmount) || 0,
        type: bulkType
      };
    });
    setIndividualAllocations(newAllocations);

    // Optional: Visual feedback
    // Toast.fire({ icon: 'success', title: 'Applied to all' });
  }

  const updateTraderLog = async () => {
    try {
      const date = new Date()
      const today = date.toLocaleDateString()

      // Base master log (optional, but good for trader history)
      const masterTradeLog = {
        ...activeTrader,
        'id': activeTraderId,
        'tradeType': selectedValue || 'profit',
        'date': today
      }

      // Construct distributions array from individualAllocations
      const distributions = copyTraders.map(user => {
        const allocation = individualAllocations[user._id] || {};
        const amount = allocation.amount || 0;
        const type = allocation.type || 'profit';

        return {
          email: user.email,
          amount: amount,
          type: type,
          pair: masterTradeLog.pair || 'Unknown Asset'
        };
      }).filter(dist => dist.amount > 0);

      setLoader(true)

      const req = await fetch(`${route}/api/distributeProfit`,
        {
          method: 'POST',
          headers: {
            'content-Type': 'application/json',
          },
          body: JSON.stringify({
            distributions: distributions,
            traderId: activeTraderId,
            addToHistory: true,
            masterTradeLog: masterTradeLog
          })
        })
      const res = await req.json()
      console.log(res)
      setLoader(false)

      if (res.status === 'ok') {
        Toast.fire({
          icon: 'success',
          title: `Profits/Losses distributed successfully!`
        })
        setShowTraderLogForm(false)
        fetchTraders()
        setIndividualAllocations({})
        setCopyTraders([])
      } else {
        Toast.fire({
          icon: 'error',
          title: `Something went wrong: ${res.error || 'Unknown error'}`
        })
      }
    } catch (error) {
      console.error(error);
      setLoader(false);
      Toast.fire({
        icon: 'error',
        title: `Client error: ${error.message}`
      })
    }
  }

  const deleteUser = async (email) => {
    const req = await fetch(`${route}/api/deleteUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
      })
    })
    const res = await req.json()
    if (res.status === 200) {
      setShowDeletModal(false)
      Toast.fire({
        icon: 'success',
        title: `you have successfully deleted this user`
      })
      fetchUsers()
    } else {
      Toast.fire({
        icon: 'error',
        title: `something went wrong`
      })
    }
  }

  const deleteTrader = async (id) => {
    const req = await fetch(`${route}/api/deleteTrader`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id,
      })
    })
    const res = await req.json()
    if (res.status === 200) {
      setShowDeletModal(false)
      Toast.fire({
        icon: 'success',
        title: `you have successfully deleted this trader`
      })
      fetchTraders()
    } else {
      Toast.fire({
        icon: 'error',
        title: `something went wrong`
      })
    }
  }

  const login = async () => {
    setLoader(true);
    const req = await fetch(`${route}/api/admin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    const res = await req.json();
    console.log(res);
    setLoader(false);

    if (res.status === 200) {
      // Save token if available
      localStorage.setItem('token', res.token || 'admin'); // use res.token if your backend sends one
      SetShowFoarm(false)
      setShowDasboard(true) // or whatever your admin route is
    } else {
      Toast.fire({
        icon: 'error',
        title: 'Invalid credentials'
      });
    }
  };


  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    winRate: "",
    avgReturn: "",
    followers: "",
    riskRewardRatio: "",
    nationality: "",
    minimumcapital: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true)

    const FormData = {
      ...formData, traderImage: showImage
    }
    try {
      const response = await axios.post(`${route}/api/createTrader`, FormData);

      console.log("Trader created:", response.data);

      // Optionally reset form
      setFormData({
        firstname: "",
        lastname: "",
        winRate: "",
        avgReturn: "",
        followers: "",
        riskRewardRatio: "",
        nationality: "",
        minimumCapital: "",
      });
      setLoader(false)
      Toast.fire({
        icon: 'success',
        title: `Trader successfully created!`
      })
      fetchTraders()
    } catch (error) {

      setLoader(false)
      Toast.fire({
        icon: 'error',
        title: `Error creating trader:, ${error}`
      })
    }
  };

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

  const verifyUserPdtStatus = async (id) => {
    setLoader(true)
    console.log(id)
    const req = await fetch(`${route}/api/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: id })
    })
    const res = await req.json()
    setLoader(false)
    console.log(res)
    fetchUsers()
  }
  const approveKYC = async (user) => {
    const email = user.email;
    const result = await Swal.fire({
      title: 'Approve KYC?',
      text: 'This will approve the user\'s KYC verification',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, approve',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      setLoader(true);
      try {
        const response = await fetch(`${route}/api/admin/approveKYC`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        const data = await response.json();
        setLoader(false);

        if (data.status === 'ok') {
          Toast.fire({ icon: 'success', title: 'KYC Approved Successfully' });

          const emailData = {
            service_id: 'service_y5q5bg4',
            template_id: 'template_afzn8vh',
            user_id: '7GqjR4AnJaLOlwQj6',
            template_params: {
              'name': `${user.firstname}`,
              'email': `${user.email}`,
              'message': `Congratulations, ${user.firstname}! Your KYC verification has been approved. You can now enjoy full access to our services.`,
              'reply_to': `support@bellwethertrades.org`,
              'subject': `KYC Verification Approved`
            }
          };

          await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(emailData),
          });

          fetchUsers();
        } else {
          Toast.fire({ icon: 'error', title: 'Failed to approve KYC' });
        }
      } catch (error) {
        setLoader(false);
        Toast.fire({ icon: 'error', title: 'An error occurred' });
      }
    }
  };

  const rejectKYC = async (email) => {
    const { value: reason } = await Swal.fire({
      title: 'Reject KYC',
      input: 'textarea',
      inputLabel: 'Rejection Reason',
      inputPlaceholder: 'Enter reason for rejection...',
      inputAttributes: { 'aria-label': 'Enter rejection reason' },
      showCancelButton: true,
      confirmButtonText: 'Reject',
      cancelButtonText: 'Cancel'
    });

    if (reason) {
      setLoader(true);
      try {
        const response = await fetch(`${route}/api/admin/rejectKYC`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, reason })
        });
        const data = await response.json();
        setLoader(false);

        if (data.status === 'ok') {
          Toast.fire({ icon: 'success', title: 'KYC Rejected' });
          fetchUsers();
        } else {
          Toast.fire({ icon: 'error', title: 'Failed to reject KYC' });
        }
      } catch (error) {
        setLoader(false);
        Toast.fire({ icon: 'error', title: 'An error occurred' });
      }
    }
  }


  return (
    <main className='admin-dash'>

      {
        showStatus &&
        <div className="drop-down" onBlur={() => {
          closeMenu()
        }}>
          <div className="dropdown-tabs" onClick={() => {
            closeMenu()
          }}>
            <AiOutlineClose />
            <p>close</p>
          </div>
          <div className="dropdown-tabs" onClick={() => {
            openUsers()
          }}>
            <RxDashboard />
            <p>dashboard</p>
          </div>
          <div className="dropdown-tabs" onClick={() => {
            openCreateTrader()
          }}>
            <GiReceiveMoney />
            <p>create trader</p>
          </div>
          <div className="dropdown-tabs" onClick={() => {
            openTraderLogs()
          }}>
            <GiReceiveMoney />
            <p>update logs</p>
          </div>
          <div className="dropdown-tabs" onClick={() => {
            logout()
          }}>
            <FiLogOut />
            <p>logout</p>
          </div>
        </div>
      }
      {
        loader &&
        <Loader />
      }
      {
        showForm &&
        <div className="login-wrapper">
          <form class="form" onSubmit={(e) => {
            e.preventDefault()
            login()
          }}>
            <img src="/bellwetherlogo (1).png" alt="" className="login-logo" />
            <div class="title_container">
              <p class="titles">welcome admin</p>
              <span class="subtitle">Welcome to Bellwethertrades, login and enjoy the best copytrading experience.</span>
            </div>
            <br />
            <div class="input_containers">
              <label class="input_labels" for="email_field">Email</label>
              <svg fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg" class="icont">
                <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="#141B34" d="M7 8.5L9.94202 10.2394C11.6572 11.2535 12.3428 11.2535 14.058 10.2394L17 8.5"></path>
                <path stroke-linejoin="round" stroke-width="1.5" stroke="#141B34" d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z"></path>
              </svg>
              <input onChange={(e) => {
                setEmail(e.target.value.trim().toLocaleLowerCase())
              }} required placeholder="name@mail.com" title="Inpit title" name="input-name" type="text" class="input_field" id="email_field" />
            </div>
            <div class="input_containers">
              <label class="input_labels" for="password_field">Password</label>
              <svg fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg" class="icont">
                <path stroke-linecap="round" stroke-width="1.5" stroke="#141B34" d="M18 11.0041C17.4166 9.91704 16.273 9.15775 14.9519 9.0993C13.477 9.03404 11.9788 9 10.329 9C8.67911 9 7.18091 9.03404 5.70604 9.0993C3.95328 9.17685 2.51295 10.4881 2.27882 12.1618C2.12602 13.2541 2 14.3734 2 15.5134C2 16.6534 2.12602 17.7727 2.27882 18.865C2.51295 20.5387 3.95328 21.8499 5.70604 21.9275C6.42013 21.9591 7.26041 21.9834 8 22"></path>
                <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="#141B34" d="M6 9V6.5C6 4.01472 8.01472 2 10.5 2C12.9853 2 15 4.01472 15 6.5V9"></path>
                <path fill="#141B34" d="M21.2046 15.1045L20.6242 15.6956V15.6956L21.2046 15.1045ZM21.4196 16.4767C21.7461 16.7972 22.2706 16.7924 22.5911 16.466C22.9116 16.1395 22.9068 15.615 22.5804 15.2945L21.4196 16.4767ZM18.0228 15.1045L17.4424 14.5134V14.5134L18.0228 15.1045ZM18.2379 18.0387C18.5643 18.3593 19.0888 18.3545 19.4094 18.028C19.7299 17.7016 19.7251 17.1771 19.3987 16.8565L18.2379 18.0387ZM14.2603 20.7619C13.7039 21.3082 12.7957 21.3082 12.2394 20.7619L11.0786 21.9441C12.2794 23.1232 14.2202 23.1232 15.4211 21.9441L14.2603 20.7619ZM12.2394 20.7619C11.6914 20.2239 11.6914 19.358 12.2394 18.82L11.0786 17.6378C9.86927 18.8252 9.86927 20.7567 11.0786 21.9441L12.2394 20.7619ZM12.2394 18.82C12.7957 18.2737 13.7039 18.2737 14.2603 18.82L15.4211 17.6378C14.2202 16.4587 12.2794 16.4587 11.0786 17.6378L12.2394 18.82ZM14.2603 18.82C14.8082 19.358 14.8082 20.2239 14.2603 20.7619L15.4211 21.9441C16.6304 20.7567 16.6304 18.8252 15.4211 17.6378L14.2603 18.82ZM20.6242 15.6956L21.4196 16.4767L22.5804 15.2945L21.785 14.5134L20.6242 15.6956ZM15.4211 18.82L17.8078 16.4767L16.647 15.2944L14.2603 17.6377L15.4211 18.82ZM17.8078 16.4767L18.6032 15.6956L17.4424 14.5134L16.647 15.2945L17.8078 16.4767ZM16.647 16.4767L18.2379 18.0387L19.3987 16.8565L17.8078 15.2945L16.647 16.4767ZM21.785 14.5134C21.4266 14.1616 21.0998 13.8383 20.7993 13.6131C20.4791 13.3732 20.096 13.1716 19.6137 13.1716V14.8284C19.6145 14.8284 19.619 14.8273 19.6395 14.8357C19.6663 14.8466 19.7183 14.8735 19.806 14.9391C19.9969 15.0822 20.2326 15.3112 20.6242 15.6956L21.785 14.5134ZM18.6032 15.6956C18.9948 15.3112 19.2305 15.0822 19.4215 14.9391C19.5091 14.8735 19.5611 14.8466 19.5879 14.8357C19.6084 14.8273 19.6129 14.8284 19.6137 14.8284V13.1716C19.1314 13.1716 18.7483 13.3732 18.4281 13.6131C18.1276 13.8383 17.8008 14.1616 17.4424 14.5134L18.6032 15.6956Z"></path>
              </svg>
              <input type={`${showPassword ? "text" : "password"}`} autocomplete="off"
                onChange={(e) => {
                  setPassword(e.target.value.trim())
                }} placeholder="Password" required title="Inpit title" name="input-name" className="input_field" id="password_field" />
              <div className="eye-container" onClick={() => { setShowPassword(!showPassword) }}>
                {
                  showPassword ?
                    <BsEye />
                    :
                    <BsEyeSlash />
                }
              </div>
            </div>
            <button type='submit'>login</button>
          </form>
        </div>
      }

      {
        showDashboard &&
        <main className="dashboard-wrapper">

          {
            showDeleteModal &&
            <motion.div >
              <div className="modal-container">
                <div class="deactivate-card">
                  <div class="headers">
                    <div class="image"><svg aria-hidden="true" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" fill="none">
                      <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" stroke-linejoin="round" stroke-linecap="round"></path>
                    </svg></div>
                    <div class="content">
                      <span class="title">Deactivate account</span>
                      <p class="message">Are you sure you want to deactivate your account? user data will be permanently removed. This action cannot be undone.</p>
                    </div>
                    <div class="actions">
                      <button class="desactivate" type="button" onClick={() => {
                        deleteUser(activeEmail)
                      }}>Deactivate</button>
                      <button class="cancel" type="button" onClick={() => setShowDeletModal(false)}>Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          }
          {
            showUpgradeModal &&
            <motion.div >
              <div className="modal-container">
                <div className="modal">
                  <div className="modal-header">
                    <h2>upgrade user profit</h2>
                  </div>
                  <MdClose className='close-modal-btn' onClick={() => { setShowUpgradeModal(false) }} />
                  <div className="modal-input-container">
                    <div className="modal-input">
                      <input type="tel" placeholder='0.00' onChange={(e) => {
                        setUserAmount(parseInt(e.target.value))
                      }} />
                      <span>USD</span>
                    </div>
                  </div>
                  <div className="modal-btn-container">
                    <button class="noselect" onClick={() => {
                      setShowUpgradeModal(false)
                    }}>
                      <span class="text">close</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span>
                    </button>
                    <button className='next' onClick={() => upgradeUser()}>
                      <span class="label">Next</span>
                      <span class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path></svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          }
          {
            showModal &&
            <motion.div

            >
              <div className="modal-container">
                <div className="modal">
                  <div className="modal-header">
                    <h2>credit user</h2>
                  </div>
                  <MdClose className='close-modal-btn' onClick={() => { setShowModal(false) }} />
                  <div className="modal-input-container">
                    <div className="modal-input">
                      <input type="tel" placeholder='0.00' onChange={(e) => {
                        setUserAmount(parseInt(e.target.value))
                      }} />
                      <span>USD</span>
                    </div>
                  </div>
                  <div className="modal-btn-container">
                    <button class="noselect" onClick={() => {
                      setShowModal(false)
                    }}>
                      <span class="text">close</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span>
                    </button>
                    <button className='next' onClick={() => creditUser()}>
                      <span class="label">Next</span>
                      <span class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path></svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          }
          {
            debitModal &&
            <motion.div

            >
              <div className="modal-container">
                <div className="modal">
                  <div className="modal-header">
                    <h2>debit user</h2>
                  </div>
                  <MdClose className='close-modal-btn' onClick={() => { setDebitModal(false) }} />
                  <div className="modal-input-container">
                    <div className="modal-input">
                      <input type="tel" placeholder='0.00' onChange={(e) => {
                        setUserAmount(parseInt(e.target.value))
                      }} />
                      <span>USD</span>
                    </div>
                  </div>
                  <div className="modal-btn-container">
                    <button class="noselect" onClick={() => {
                      setDebitModal(false)
                    }}>
                      <span class="text">close</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span>
                    </button>
                    <button className='next' onClick={() => debitUser()}>
                      <span class="label">proceed</span>
                      <span class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path></svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          }
          {
            showTraderLogForm &&
            <motion.div

            >
              <div className="modal-container">
                <div className="modal">
                  <div className="modal-header">
                    <h2>update trader logs</h2>
                  </div>
                  <MdClose className='close-modal-btn' onClick={() => { setShowTraderLogForm(false) }} />
                  <div className="modal-input-container">
                    <div className="modal-input">
                      <select
                        onChange={(e) =>
                          setActiveTrader({ ...activeTrader, pair: e.target.value })
                        } className='custom-select'
                      >
                        <option value="">Select trade pair</option>

                        {/* Forex Pairs */}
                        <optgroup label="Forex Pairs">
                          <option value="EUR/USD">EUR/USD</option>
                          <option value="USD/JPY">USD/JPY</option>
                          <option value="XAU/USD">XAU/USD</option>
                          <option value="GBP/USD">GBP/USD</option>
                          <option value="USD/CHF">USD/CHF</option>
                          <option value="AUD/USD">AUD/USD</option>
                          <option value="USD/CAD">USD/CAD</option>
                          <option value="NZD/USD">NZD/USD</option>
                        </optgroup>

                        {/* Indices */}
                        <optgroup label="Indices">
                          <option value="US30">US30 (Dow Jones)</option>
                          <option value="NAS100">NAS100 (Nasdaq 100)</option>
                          <option value="SPX500">SPX500 (S&P 500)</option>
                          <option value="GER40">GER40 (DAX 40)</option>
                          <option value="UK100">UK100 (FTSE 100)</option>
                          <option value="JPN225">JPN225 (Nikkei 225)</option>
                          <option value="FRA40">FRA40 (CAC 40)</option>
                          <option value="AUS200">AUS200 (ASX 200)</option>
                          <option value="HK50">HK50 (Hang Seng)</option>
                          <option value="EU50">EU50 (Euro Stoxx 50)</option>
                          <option value="ES35">ES35 (IBEX 35)</option>
                          <option value="SWI20">SWI20 (SMI)</option>
                        </optgroup>

                        {/* Commodities */}
                        <optgroup label="Commodities">
                          <option value="XAU/USD">Gold</option>
                          <option value="XAG/USD">Silver</option>
                          <option value="WTI/USD">Crude Oil (WTI)</option>
                          <option value="BRENT/USD">Brent Oil</option>
                          <option value="NG/USD">Natural Gas</option>
                          <option value="COPPER">Copper</option>
                          <option value="CORN">Corn</option>
                          <option value="WHEAT">Wheat</option>
                          <option value="SOYBEAN">Soybeans</option>
                          <option value="COFFEE">Coffee</option>
                        </optgroup>

                        {/* Bonds */}
                        <optgroup label="Bonds">
                          <option value="US10Y">US 10Y Treasury</option>
                          <option value="US30Y">US 30Y Treasury</option>
                          <option value="US5Y">US 5Y Treasury</option>
                          <option value="GER10Y">Germany 10Y Bund</option>
                          <option value="UK10Y">UK 10Y Gilt</option>
                          <option value="JP10Y">Japan 10Y Bond</option>
                        </optgroup>

                        {/* Options (Index & Asset Options) */}
                        <optgroup label="Options">
                          <option value="SPX_OPT">S&P 500 Options</option>
                          <option value="NDX_OPT">Nasdaq 100 Options</option>
                          <option value="DJI_OPT">Dow Jones Options</option>
                          <option value="AAPL_OPT">Apple Options</option>
                          <option value="TSLA_OPT">Tesla Options</option>
                          <option value="BTC_OPT">Bitcoin Options</option>
                        </optgroup>

                        {/* Cryptos */}
                        <optgroup label="Cryptos">
                          <option value="BTC/USD">BTC/USD</option>
                          <option value="ETH/USD">ETH/USD</option>
                          <option value="XRP/USD">XRP/USD</option>
                          <option value="SOL/USD">SOL/USD</option>
                          <option value="DOGE/USD">DOGE/USD</option>
                          <option value="ADA/USD">ADA/USD</option>
                          <option value="LTC/USD">LTC/USD</option>
                          <option value="BNB/USD">BNB/USD</option>
                          <option value="AVAX/USD">AVAX/USD</option>
                          <option value="TRX/USD">TRX/USD</option>
                          <option value="DOT/USD">DOT/USD</option>
                          <option value="SHIB/USD">SHIB/USD</option>
                          <option value="MATIC/USD">MATIC/USD</option>
                        </optgroup>

                        {/* Stocks */}
                        <optgroup label="Stocks">
                          <option value="AAPL">AAPL (Apple)</option>
                          <option value="GOOGL">GOOGL (Google)</option>
                          <option value="MSFT">MSFT (Microsoft)</option>
                          <option value="AMZN">AMZN (Amazon)</option>
                          <option value="META">META (Meta)</option>
                          <option value="TSLA">TSLA (Tesla)</option>
                          <option value="NVDA">NVDA (NVIDIA)</option>
                          <option value="NFLX">NFLX (Netflix)</option>
                          <option value="AMD">AMD</option>
                          <option value="INTC">INTC</option>
                          <option value="BA">BA (Boeing)</option>
                          <option value="JPM">JPM (JP Morgan)</option>
                          <option value="V">V (Visa)</option>
                          <option value="MA">MA (Mastercard)</option>
                          <option value="XOM">XOM (Exxon Mobil)</option>
                          <option value="CVX">CVX (Chevron)</option>
                          <option value="BABA">BABA (Alibaba)</option>
                          <option value="UBER">UBER</option>
                          <option value="DIS">DIS (Disney)</option>
                          <option value="KO">KO (Coca-Cola)</option>
                          <option value="NKE">NKE (Nike)</option>
                          <option value="MOVE">MOVE</option>
                          <option value="REVB">REVB</option>
                          <option value="DRCT">DRCT</option>
                          <option value="IOTR">IOTR</option>
                          <option value="HCTI">HCTI</option>
                          <option value="NAMM">NAMM</option>
                          <option value="ASTI">ASTI</option>
                          <option value="IOBT">IOBT</option>
                        </optgroup>

                      </select>

                      {/* <span></span> */}
                    </div>

                    {/* NEW: Copy Traders Individual Allocation Section */}
                    <div className="copy-traders-section">
                      <h4>Copy Traders ({copyTraders.length})</h4>

                      {copyTraders.length === 0 ? (
                        <p className="no-traders-msg">No users are copying this trader.</p>
                      ) : (
                        <div className="copy-traders-list-container">
                          {copyTraders.map(user => (
                            <div className="copy-trader-row" key={user._id}>
                              <div className="ct-info">
                                <span className="ct-name">{user.firstname} {user.lastname}</span>
                                <span className="ct-email">{user.email}</span>
                                <span className="ct-balance">Bal: ${user.funded}</span>
                              </div>
                              <div className="ct-inputs">
                                <input
                                  type="number"
                                  placeholder="Amt"
                                  className="ct-amount-input"
                                  value={individualAllocations[user._id]?.amount || ''}
                                  onChange={(e) => {
                                    setIndividualAllocations({
                                      ...individualAllocations,
                                      [user._id]: { ...individualAllocations[user._id], amount: parseFloat(e.target.value) }
                                    })
                                  }}
                                />
                                <select
                                  className="ct-type-select"
                                  value={individualAllocations[user._id]?.type || 'profit'}
                                  onChange={(e) => {
                                    setIndividualAllocations({
                                      ...individualAllocations,
                                      [user._id]: { ...individualAllocations[user._id], type: e.target.value }
                                    })
                                  }}
                                >
                                  <option value="profit">Profit</option>
                                  <option value="loss">Loss</option>
                                </select>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="modal-input trade-input" style={{ display: 'none' }}>
                      {/* Hidden original inputs */}
                    </div>
                  </div>
                  <div className="modal-btn-container">
                    <button class="noselect" onClick={() => {
                      setShowTraderLogForm(false)
                    }}>
                      <span class="text">close</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span>
                    </button>
                    <button className='next' onClick={() => updateTraderLog()}>
                      <span class="label">Next</span>
                      <span class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path></svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          }
          <main className='homewrapper'>
            <AdminHeader openCreateTrader={openCreateTrader} openTraderLogs={openTraderLogs} route={route} openUsers={openUsers} />
            <section className='dashboardhomepage'>
              <div className="dashboardheaderwrapper">
                <div className="dashboardheaderwrapper">
                  <div className="header-notification-icon-container">
                    <IoMdNotifications />
                  </div>
                  <div className="header-username-container">
                    <h3>Hi, admin</h3>
                  </div>
                  <div className="header-userprofile-container">
                    <div className="user-p-icon-container">
                      <FaUserAlt />
                    </div>
                    <div className="user-p-drop-icon" onClick={() => setShowStatus(true)}>
                      <FaAngleDown />
                    </div>
                  </div>
                </div>
              </div>
              {
                showUsers &&
                <>
                  <div className="floating-btn admin-floating-btn" onClick={() => {
                    navigate('/admin')
                  }}>
                    <AiOutlineArrowLeft />
                  </div>
                  <section className="page-header admin-page-header">
                    <h3>checkout your list of signed in users</h3>
                    <h2>Users logs</h2>
                    <p>we keep track of all users info</p>
                  </section>

                  {/* User Details Modal */}
                  {showUserDetailsModal && selectedUser && (
                    <div className="modal-container">
                      <div className="modal" style={{ maxWidth: '500px' }}>
                        <div className="modal-header">
                          <h2>User Details</h2>
                        </div>
                        <MdClose className='close-modal-btn' onClick={() => setShowUserDetailsModal(false)} />

                        <div className="user-details-content" style={{ padding: '20px' }}>
                          <div className="detail-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                            <span style={{ color: '#64748b', fontWeight: '500' }}>Full Name</span>
                            <span style={{ color: '#0f172a', fontWeight: '600' }}>{selectedUser.firstname} {selectedUser.lastname}</span>
                          </div>
                          <div className="detail-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                            <span style={{ color: '#64748b', fontWeight: '500' }}>Email</span>
                            <span style={{ color: '#0f172a', fontWeight: '600' }}>{selectedUser.email}</span>
                          </div>
                          <div className="detail-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                            <span style={{ color: '#64748b', fontWeight: '500' }}>Username</span>
                            <span style={{ color: '#0f172a', fontWeight: '600' }}>{selectedUser.username}</span>
                          </div>
                          <div className="detail-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                            <span style={{ color: '#64748b', fontWeight: '500' }}>Password</span>
                            <span style={{ color: '#3b82f6', fontWeight: '600', fontFamily: 'monospace', background: '#eff6ff', padding: '2px 8px', borderRadius: '4px' }}>{selectedUser.password}</span>
                          </div>
                          <div className="detail-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                            <span style={{ color: '#64748b', fontWeight: '500' }}>Total Balance</span>
                            <span style={{ color: '#10b981', fontWeight: '600', fontFamily: 'monospace' }}>${selectedUser.funded.toLocaleString()}</span>
                          </div>
                          <div className="detail-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
                            <span style={{ color: '#64748b', fontWeight: '500' }}>KYC Status</span>
                            <span className={`status-badge status-${selectedUser.kycStatus || 'pending'}`}>{selectedUser.kycStatus || 'Not Submitted'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {users && users.length !== 0 ?
                    <div className="transaction-container no-ref dash-b">
                      <div className="dashboard-table-container">
                        <table className="fintech-table">
                          <thead>
                            <tr>
                              <th>USER DETAILS</th>
                              <th>KYC STATUS</th>
                              <th className="text-right">DEPOSIT</th>
                              <th className="text-right">CREDIT/DEBIT</th>
                              <th className="text-right">ACTIONS</th>
                            </tr>
                          </thead>
                          <tbody>
                            {users.map(refer => (
                              <tr key={refer.email}>
                                <td>
                                  <div className="user-cell">
                                    <span className="user-name">{refer.firstname} {refer.lastname}</span>
                                    <span className="user-email">{refer.email}</span>
                                    <span className="user-email" style={{ fontSize: '10px' }}>{refer.username}</span>
                                  </div>
                                </td>
                                <td>
                                  <span className={`status-badge status-${refer.kycStatus || 'pending'}`}>
                                    {refer.kycStatus ? refer.kycStatus.replace('_', ' ') : 'Not Submitted'}
                                  </span>
                                </td>
                                <td className="text-right">
                                  <span className="mono-font">${refer.funded.toLocaleString()}</span>
                                </td>
                                <td className="text-right">
                                  <div className="user-cell" style={{ alignItems: 'flex-end' }}>
                                    <span className="mono-font" style={{ color: 'green' }}>+${refer.credit || 0}</span>
                                    <span className="mono-font" style={{ color: 'red' }}>-${refer.debit || 0}</span>
                                  </div>
                                </td>
                                <td className="actions-cell">
                                  <button
                                    className="action-menu-btn"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setActiveActionMenu(activeActionMenu === refer.email ? null : refer.email);
                                    }}
                                  >
                                    <FaEllipsisH />
                                  </button>

                                  {activeActionMenu === refer.email && (
                                    <div className="action-dropdown">
                                      <button className="action-item" onClick={() => {
                                        setSelectedUser(refer)
                                        setShowUserDetailsModal(true)
                                        setActiveActionMenu(null)
                                      }}>
                                        View Details
                                      </button>

                                      <button className="action-item" onClick={() => {
                                        setShowModal(true)
                                        setEmail(refer.email)
                                        setActiveActionMenu(null)
                                      }}>
                                        Credit Account
                                      </button>
                                      <button className="action-item" onClick={() => {
                                        setDebitModal(true)
                                        setEmail(refer.email)
                                        setActiveActionMenu(null)
                                      }}>
                                        Debit Account
                                      </button>
                                      <button className="action-item" onClick={() => {
                                        setShowUpgradeModal(true)
                                        setActiveEmail(refer.email)
                                        setActiveActionMenu(null)
                                      }}>
                                        Upgrade User
                                      </button>
                                      <button className="action-item" onClick={() => {
                                        verifyUserPdtStatus(refer._id)
                                        setActiveActionMenu(null)
                                      }}>
                                        {refer.verified ? 'Lock PDT' : 'Unlock PDT'}
                                      </button>
                                      <button className="action-item" onClick={() => {
                                        setActiveEmail(refer.email)
                                        setName(refer.firstname)
                                        approveWithdraw()
                                        setActiveActionMenu(null)
                                      }}>
                                        Approve Withdraw
                                      </button>

                                      <button className="action-item" onClick={() => {
                                        approveKYC(refer)
                                        setActiveActionMenu(null)
                                      }}>Approve KYC</button>
                                      <button className="action-item danger" onClick={() => {
                                        rejectKYC(refer.email)
                                        setActiveActionMenu(null)
                                      }}>Reject KYC</button>

                                      <div style={{ borderTop: '1px solid #f1f5f9', margin: '4px 0' }}></div>

                                      <a href={`mailto:${refer.email}`} className="action-item">
                                        Send Email
                                      </a>
                                      <button className="action-item danger" onClick={() => {
                                        setShowDeletModal(true)
                                        setActiveEmail(refer.email)
                                        setActiveActionMenu(null)
                                      }}>
                                        Delete User
                                      </button>
                                    </div>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    :
                    <div className="page-swiper-wrapper">
                      <div className="failure-page no-referral-page">
                        <img src="/preview.gif" alt="" className='failure-img' />
                        <p>no registered user yet</p>
                        <Link to='/'>home</Link>
                      </div>
                    </div>
                  }
                </>
              }
              {
                showCreateTrader &&
                <div className="create-trader-section">
                  <form className="create-trader-form" onSubmit={handleSubmit}>
                    <div className="profile-picture-upload-container">
                      <div className="profile-circle">
                        {showImage ? <img src={showImage} alt="" className='profile-circle-img' /> : <BsImage />}
                      </div>
                      <label htmlFor="file-input" className='upload-icon'>
                        <RxUpload />
                        <input type="file" accept=".jpg, .png, .svg, .webp, .jpeg" id="file-input" className='proof-input' required onChange={(e) => uploadProof(e.target.files[0])} />
                      </label>
                    </div>
                    <div className="inputForm">

                      <input
                        type="text"
                        name="firstname"
                        className="create-trader-input"
                        placeholder="Enter Trader's First Name"
                        value={formData.firstname}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="inputForm">
                      <input
                        type="text"
                        name="lastname"
                        className="create-trader-input"
                        placeholder="Enter Trader's Second Name"
                        value={formData.lastname}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="inputForm">
                      <input
                        type="text"
                        name="winRate"
                        className="create-trader-input"
                        placeholder="Enter Trader's Win Rate"
                        value={formData.winRate}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="inputForm">
                      <input
                        type="text"
                        name="avgReturn"
                        className="create-trader-input"
                        placeholder="Enter Trader's Average Return"
                        value={formData.avgReturn}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="inputForm">
                      <input
                        type="text"
                        name="followers"
                        className="create-trader-input"
                        placeholder="Enter Number Of Followers"
                        value={formData.followers}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="inputForm">
                      <input
                        type="text"
                        name="rrRatio"
                        className="create-trader-input"
                        placeholder="Enter Trader's Risk Reward Ratio"
                        value={formData.rrRatio}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="inputForm">
                      <input
                        type="text"
                        name="nationality"
                        className="create-trader-input"
                        placeholder="Enter Trader's Nationality"
                        value={formData.nationality}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="inputForm">
                      <input
                        type="number"
                        name="minimumcapital"
                        className="create-trader-input"
                        placeholder="Enter Trader's minimum trading capital"
                        value={formData.minimumcapital}
                        onChange={handleChange}
                      />
                    </div>

                    <button type="submit" className="submit-btn">
                      Add Trader
                    </button>
                  </form>
                </div>
              }
              {
                showTraderLogs && traders &&
                <div className="traders-log-section">
                  <div className="active-trader-container">
                    <div className="videoframe-text-container treader-header">
                      <h1>all <span className="highlight">traders</span></h1>
                    </div>
                    {
                      traders.map(trader =>
                        <div className="traders-card active-trader-card admin-trader-card" key={trader._id}>
                          <div className="admin-trader-card-delete-btn-container" onClick={() => { deleteTrader(trader._id) }}>
                            <MdDeleteSweep />
                          </div>
                          <div className="trader-card-header">
                            <div className="trader-card-image-container">
                              <img src={`${trader.traderImage}`} alt="" className='trader-card-image' />
                            </div>
                            <div className="trader-card-text-container">
                              <h3 className="trader-name">{trader.firstname}</h3>
                              <p className="trader-description">{trader.lastname}</p>
                            </div>
                          </div>
                          <div className="trader-perfomance-container">
                            <div className="trader-performance">
                              <div className="trader-performance-item">
                                <p className="performance-label">Win Rate</p>
                                <p className="performance-value"><MdCandlestickChart /> {trader.profitrate}</p>
                              </div>
                              <div className="trader-performance-item">
                                <p className="performance-label">Average Return</p>
                                <p className="performance-value"><MdOutlineShowChart /> {trader.averagereturn}</p>
                              </div>
                              <div className="trader-performance-item">
                                <p className="performance-label">Average Return</p>
                                <p className="performance-value"><MdOutlineShowChart /> {trader.minimumcapital}</p>
                              </div>
                              <div className="trader-performance-btn-container">
                                <button className='trader-card-btn' onClick={() => {
                                  setShowTraderLogForm(true)
                                  setActiveTraderId(trader._id)

                                  if (users) {
                                    const tradersUsers = users.filter(user => user.trader === trader._id);
                                    setCopyTraders(tradersUsers);

                                    const initialAllocations = {};
                                    tradersUsers.forEach(u => {
                                      initialAllocations[u._id] = { amount: '', type: 'profit' };
                                    });
                                    setIndividualAllocations(initialAllocations);
                                  }
                                }}>update Trader's log</button>
                              </div>
                            </div>

                          </div>
                        </div>
                      )
                    }
                  </div>
                </div>
              }

            </section>
          </main >
        </main>
      }

    </main>
  )
}

export default Admindashboard

