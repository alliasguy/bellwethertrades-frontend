import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login'
import Home from './pages/Home';
import AOS from 'aos'
import 'aos/dist/aos.css'
import Signup from './pages/Signup';
import Userdashboard from './pages/Userdashboard'
import Userdashboardfundaccount from './components/userdashboardfundaccount/Userdashboardfundaccount'
import Userdashboardwithdraw from './components/userdashboardwithdraw/Userdashboardwithdraw';
import Userdashboardreferrals from './components/userdashboardreferrals/Userdashboardreferrals';
import Userdashboardplans from './components/userdashboardplans/Userdashboardplans';
import Userdashboardtransactions from './components/userdashboardtransactions/Userdashboardtransactions';
import Investments from './components/invesments/Investments';
import Profile from './components/profile/Profile'
import VerifyEmail from './pages/VerifyEmail';
import WithdrawalLogs from './components/WithdrawalLogs';
import Checkout from './components/Checkout';
import Admindashboard from './components/admindashboard/Admindashboard';
import Deposit from './components/deposit/Deposit';
import Aboutpage from './pages/Aboutpage';
import Faq from './pages/Faq';
import Buybitcoin from './pages/Buybitcoin';
import Policy from './pages/Policy';
import './App.css'
import CopytradePage from './pages/copytrade/CopytradePage';
import Forex from './pages/forex/Forex';
import Indices from './pages/indices/Indices';
import Futures from './pages/futures/Futures';
import Stocks from './pages/stocks/Stocks';
import News from './pages/news/News';
import TechnicalAnalysisPage from './pages/technicalAnalysis/TechnicalAnalysisPage'
import Heatmaps from './pages/heatmaps/Heatmaps';
import Watchlist from './pages/watchlist/Watchlist';
import Team from './pages/team/Team'
import UserdashboardCopytrade from './components/userdashboardCopytrade/UserdashboardCopytrade';
import UserdashboardKyc from './components/userdashboardKyc/UserdashboardKyc';
import UserdashboardLiveTrading from './components/userdashboardLiveTrading/UserdashboardLiveTrading';
import UserdashboardRanking from './components/userdashboardRanking/UserdashboardRanking';
import UserdashboardTraders from './components/userdashboardTraders/UserdashboardTraders';
import PasswordReset from './components/passwordreset/PasswordReset';
import ForgotPassword from './components/forgotpassword/ForgotPassword';



function App() {
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      offset: 60,
      duration: 500,
      easing: 'ease-in-sine',
      delay: 100,
    })
    AOS.refresh()
    // duration=1200;
  }, [])


  // const route = 'https://bellwethertrades-backend.vercel.app'
  const route = 'http://localhost:5000'

  return (
    <>
      <AnimatePresence >
        <motion.div className="App"
          key={location.pathname}
          initial="initialState"
          animate="animateState"
          exit="exitState"
          transition={{ duration: 0.2 }}
          variants={{
            initialState: {
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
            },
            animateState: {
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
            },
            exitState: {
              clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
            }
          }}
        >
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login route={route} />} />
            <Route path='/signup' element={<Signup route={route} />} />
            <Route path='/dashboard' element={<Userdashboard route={route} />} />
            <Route path='/fundwallet' element={<Userdashboardfundaccount route={route} />} />
            <Route path='/referrals' element={<Userdashboardreferrals route={route} />} />
            <Route path='/withdraw' element={<Userdashboardwithdraw route={route} />} />
            <Route path='/plans' element={<Userdashboardplans route={route} />} />
            <Route path='/transactions' element={<Userdashboardtransactions route={route} />} />
            <Route path='/investments' element={<Investments route={route} />} />
            <Route path='/settings' element={<Profile route={route} />} />
            <Route path='/user/:id' element={<VerifyEmail route={route} />} />
            <Route path='/withdrawlogs' element={<WithdrawalLogs route={route} />} />
            <Route path='/checkout' element={<Checkout route={route} />} />
            <Route path='/admin' element={<Admindashboard route={route} />} />
            <Route path='/deposit' element={<Deposit route={route} />} />
            <Route path='/about' element={<Aboutpage />} />
            <Route path='/faq' element={<Faq />} />
            <Route path='/privacy-policy' element={<Policy />} />
            <Route path='/buy-crypto' element={<Buybitcoin />} />
            <Route path='/forex' element={<Forex />} />
            <Route path='/futures' element={<Futures />} />
            <Route path='/indices' element={<Indices />} />
            <Route path='/stocks' element={<Stocks />} />
            <Route path='/news' element={<News />} />
            <Route path='/technical-analysis' element={<TechnicalAnalysisPage />} />
            <Route path='/heatmaps' element={<Heatmaps />} />
            <Route path='/watchlists' element={<Watchlist />} />
            <Route path='/copytrade' element={<CopytradePage />} />
            <Route path='/team' element={<Team />} />
            <Route path='/usercopytrade' element={<UserdashboardCopytrade route={route} />} />
            <Route path='/traders' element={<UserdashboardTraders route={route} />} />
            <Route path='/live-trading' element={<UserdashboardLiveTrading route={route} />} />
            <Route path='/ranking' element={<UserdashboardRanking route={route} />} />
            <Route path='/kyc' element={<UserdashboardKyc route={route} />} />
            <Route path='/passwordreset' element={<ForgotPassword route={route} />} />
            <Route path='/resetpassword/:email' element={<PasswordReset route={route} />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default App
